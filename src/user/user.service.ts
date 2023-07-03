import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRole } from './userRole';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupUserResponseDto } from './dto/signupUser.response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRepeatCount = 10;
    const salt = await bcrypt.genSalt(saltRepeatCount);
    return await bcrypt.hash(password, salt);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public async signup(signupUserRequestDto: SignupUserRequestDto) {
    const { email, password, nickname } = signupUserRequestDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '중복된 이메일입니다',
        'EMAIL_IS_ALREADY_DUPLICATED',
      );
    }

    const hashedPassword = await this.hashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      role: UserRole.NORMAL,
      nickname,
    });

    const signupUser = await this.userRepository.save(user);

    return new SignupUserResponseDto({
      id: signupUser.id,
      email: signupUser.email,
      role: signupUser.role,
      nickname: signupUser.nickname,
    });
  }

  async login(loginUserRequestDto: LoginUserRequestDto) {
    const { email, password } = loginUserRequestDto;

    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('없는 사용자입니다', 'NOT_FOUND_USER');
    }

    const passwordsMatch = await this.comparePassword(password, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException(
        '비밀번호가 일치하지 않습니다.',
        'PASSWORD_DOSE_NOT_MATCH',
      );
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
    });

    return {
      accessToken,
    };
  }
}
