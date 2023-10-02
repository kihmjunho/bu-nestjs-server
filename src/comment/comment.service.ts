import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
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
      relations: ['user'],
      where: { contentId },
      order: {
        createdAt: 'ASC',
      },
    });

    const { comments } = new GetCommentsResponseDto(response);
    return comments;
  }

  async createComment(
    id: string,
    createCommentRequestDto: CreateCommentRequestDto,
  ) {
    const { comment, userId } = createCommentRequestDto;

    const commentCreate = new Comment({
      comment,
      userId,
      contentId: id,
    });

    return await this.commentRepository.save(commentCreate);
  }
}
