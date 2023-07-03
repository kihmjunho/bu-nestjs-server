import { UserRole } from '../userRole';

export class SignupUserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  nickname: string;

  constructor(params) {
    this.id = params.id;
    this.email = params.email;
    this.role = params.role;
    this.nickname = params.nickname;
  }
}
