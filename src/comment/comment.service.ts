import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateCommentRequestDto } from './createComment.request.dto';
import { GetCommentsResponseDto } from './GetComments.response.dto';

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

  async createComment(createCommentRequestDto: CreateCommentRequestDto) {
    const { comment, userId, contentId, commentParentId } =
      createCommentRequestDto;

    console.log(commentParentId);

    const commentCreate = new Comment({
      comment,
      userId,
      contentId,
      parentId: commentParentId,
    });

    console.log(commentCreate);

    return await this.commentRepository.save(commentCreate);
  }
}
