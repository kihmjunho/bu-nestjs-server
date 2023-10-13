import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateCommentRequestDto } from './createComment.request.dto';
import { GetCommentsResponseDto } from './getComments.response.dto';
import { UpdateCommentRequestDto } from './updateComment.request.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getComments(contentId: string) {
    const response = await this.commentRepository.find({
      relations: ['user', 'children', 'children.user'],
      where: {
        contentId,
        parentId: IsNull(),
      },
      order: {
        createdAt: 'ASC',
        children: {
          createdAt: 'ASC',
        },
      },
    });
    const { comments } = new GetCommentsResponseDto(response);
    return comments;
  }

  async createComment(
    createCommentRequestDto: CreateCommentRequestDto,
    userId: string,
  ) {
    const { comment, contentId, commentParentId } = createCommentRequestDto;

    const commentCreate = new Comment({
      comment,
      userId,
      contentId,
      parentId: commentParentId,
    });

    return await this.commentRepository.save(commentCreate);
  }

  async update(
    updateCommentRequestDto: UpdateCommentRequestDto,
    userId: string,
  ) {
    const { comment, commentId } = updateCommentRequestDto;
    const content = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (content) {
      content.comment = comment;
    }

    await this.commentRepository.manager.transaction(async (manager) => {
      await manager.save(content);
    });
  }

  async delete(id: any) {
    const comment = await this.commentRepository.findOne({
      relations: ['children'],
      where: {
        id: id.id,
      },
    });

    if (!comment) {
      throw new NotFoundException('존재하지 않는 게시글입니다');
    }

    if (comment?.children) {
      comment?.children.map(async (item: any) => {
        await this.commentRepository.manager.transaction(async (manager) => {
          await manager.softDelete(Comment, item.id);
        });
      });
    }

    await this.commentRepository.manager.transaction(async (manager) => {
      await manager.softDelete(Comment, id);
    });
  }
}
