import { UserRole } from '../userRole';
import { User } from '../entities/user.entity';

export class SignupUserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  nickname: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.nickname = user.nickname;
  }
}
