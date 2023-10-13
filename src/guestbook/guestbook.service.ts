import { Injectable, NotFoundException } from '@nestjs/common';
import { Guestbook } from './guestbook.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageRequestDto } from './dto/createMessage.request.dto';
import { UpdateMessageRequestDto } from './dto/updateMessage.request.dto';
import { Comment } from '../comment/comment.entity';

@Injectable()
export class GuestbookService {
  constructor(
    @InjectRepository(Guestbook)
    private guestRepository: Repository<Guestbook>,
  ) {}

  async findAll() {
    return await this.guestRepository.find({
      relations: ['user', 'children', 'children.user'],
      where: {
        parentId: IsNull(),
      },
      order: {
        createdAt: 'DESC',
        children: {
          createdAt: 'ASC',
        },
      },
    });
  }
  async findOne(id: string) {
    return await this.guestRepository.find({
      relations: ['user', 'children', 'children.user'],
      where: { id },
      order: {
        createdAt: 'DESC',
        children: {
          createdAt: 'DESC',
        },
      },
    });
  }

  async createMessage(
    createMessageRequestDto: CreateMessageRequestDto,
    userId: string,
  ): Promise<Guestbook> {
    const { message, messageParentId } = createMessageRequestDto;
    const guest = new Guestbook({ message, userId, parentId: messageParentId });

    return this.guestRepository.save(guest);
  }

  async update(updateMessageRequestDto: UpdateMessageRequestDto, userId: any) {
    const { message, id } = updateMessageRequestDto;
    const content = await this.guestRepository.findOne({
      where: {
        id,
      },
    });

    if (content) {
      content.message = message;
    }

    await this.guestRepository.manager.transaction(async (manager) => {
      await manager.save(content);
    });
  }

  async delete(id: any) {
    const message = await this.guestRepository.findOne({
      relations: ['children'],
      where: {
        id: id.id,
      },
    });

    if (!message) {
      throw new NotFoundException('존재하지 않는 게시글입니다');
    }

    if (message?.children) {
      message?.children.map(async (item: any) => {
        await this.guestRepository.manager.transaction(async (manager) => {
          await manager.softDelete(Guestbook, item.id);
        });
      });
    }

    await this.guestRepository.manager.transaction(async (manager) => {
      await manager.softDelete(Guestbook, id);
    });
  }
}
