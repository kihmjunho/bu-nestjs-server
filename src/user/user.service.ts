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
    await this.userRepository.duplicateEmail(email);

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
    console.log(email);
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('not found user', 'NOT_FOUND_USER');
    }

    const passwordsMatch = await user.comparePassword(password);
    if (!passwordsMatch) {
      throw new UnauthorizedException(
        'password dose not match',
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
