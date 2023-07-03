import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserService } from './user.service';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { SignupUserResponseDto } from './dto/signupUser.response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body() signupUserRequestDto: SignupUserRequestDto,
  ): Promise<SignupUserResponseDto> {
    return await this.userService.signup(signupUserRequestDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginUserRequestDto: LoginUserRequestDto,
  ): Promise<{ accessToken }> {
    return await this.userService.login(loginUserRequestDto);
  }
}
