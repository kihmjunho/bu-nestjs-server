import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserService } from './user.service';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupUserRequestDto: SignupUserRequestDto) {
    return await this.userService.signup(signupUserRequestDto);
  }

  @Post('login')
  async login(@Body() loginUserRequestDto: LoginUserRequestDto) {
    return await this.userService.login(loginUserRequestDto);
  }
}
