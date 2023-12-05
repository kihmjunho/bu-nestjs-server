import { User } from '../entities/user.entity';

export class GetUserResponseDto {
  userId: string;
  nickname: string;
  role: string;

  constructor(user: User) {
    this.userId = user.id;
    this.nickname = user.nickname;
    this.role = user.role;
  }
}
