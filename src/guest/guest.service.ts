import { Injectable } from '@nestjs/common';
import { Guest } from './guest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
  ) {}

  async findAll() {
    return await this.guestRepository.find({
      relations: ['replies'],
    });
  }
  async findOne(id: string) {
    return await this.guestRepository.find({
      relations: ['replies'],
      where: { id },
      order: {
        createdAt: 'DESC',
        replies: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async createMessage(text: string, parentCommentId?: string): Promise<Guest> {
    const guest = new Guest();
    guest.text = text;
    // guest.user = { id: userId } as any; // Replace with actual user object
    if (parentCommentId) {
      guest.parent = { id: parentCommentId } as any; // For replying to a comment
    }
    return this.guestRepository.save(guest);
  }
}
