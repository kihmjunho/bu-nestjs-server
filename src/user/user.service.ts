import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRole } from './userRole';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { Profile } from './entities/profile.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // 솔트 반복 횟수
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async signup(
    signupUserRequestDto: SignupUserRequestDto,
  ): Promise<{ message: string }> {
    const { username, password, nickname } = signupUserRequestDto;

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password);
    user.role = UserRole.NORMAL;

    const profile = new Profile();
    profile.nickname = nickname;

    user.profile = profile;

    await this.dataSource.manager.save(user);
    const message = `${nickname}님 회원가입을 축하합니다`;
    return { message };
  }

  async login(loginUserRequestDto: LoginUserRequestDto) {
    const { username, password } = loginUserRequestDto;
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('없는 사용자입니다');
    }

    const passwordsMatch = await this.comparePassword(password, user.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
    });

    return {
      accessToken,
    };
  }
}
