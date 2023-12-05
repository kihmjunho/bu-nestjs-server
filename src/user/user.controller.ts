import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignupUserRequestDto } from './dto/signupUser.request.dto';
import { UserService } from './user.service';
import { LoginUserRequestDto } from './dto/loginUser.request.dto';
import { SignupUserResponseDto } from './dto/signupUser.response.dto';
import { JwtAuthGuard } from '../config/jwt/jwtAuth.guard';
import { GetUserResponseDto } from './dto/getUser.response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body() signupUserRequestDto: SignupUserRequestDto,
  ): Promise<SignupUserResponseDto> {
    console.log(signupUserRequestDto);
    return await this.userService.signup(signupUserRequestDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginUserRequestDto: LoginUserRequestDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.login(loginUserRequestDto);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getUser(@Request() req: any) {
    const { user } = req;
    return new GetUserResponseDto(user);
  }
}
