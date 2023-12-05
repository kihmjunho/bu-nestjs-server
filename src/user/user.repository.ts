import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  public async duplicateEmail(email: string) {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(
        '중복된 이메일입니다',
        'THIS_EMAIL_IS_ALREADY_DUPLICATED',
      );
    }
    return;
  }

  public async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
