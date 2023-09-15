import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserRole } from './userRole';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupUserResponseDto } from './dto/signupUser.response.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(signupUserRequestDto: SignupUserRequestDto) {
    const { email, password, nickname } = signupUserRequestDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '중복된 이메일입니다',
        'EMAIL_IS_ALREADY_DUPLICATED',
      );
    }

    const user = new User({
      email,
      password,
      role: UserRole.NORMAL,
      nickname,
    });

    const signupUser = await this.userRepository.save(user);
    return new SignupUserResponseDto(signupUser);
  }

  async login(loginUserRequestDto: LoginUserRequestDto) {
    const { email, password } = loginUserRequestDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('없는 사용자입니다', 'NOT_FOUND_USER');
    }

    const passwordsMatch = await user.comparePassword(password);
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
      userId: user.id,
    };
  }
}
