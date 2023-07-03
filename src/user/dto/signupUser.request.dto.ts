import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignupUserRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(12, {
    message: 'Password must be at least 12 characters long',
  })
  @Matches(/^(?=.*[a-z])(?=.*\d).*$/, {
    message:
      'Password must contain at least one lowercase letter and one number',
  })
  password: string;

  @IsNotEmpty()
  nickname: string;
}
