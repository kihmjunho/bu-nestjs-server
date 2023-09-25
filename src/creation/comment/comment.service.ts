import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artwork } from '../creation-artwork/artwork.entity';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentRequestDto } from './createComment.request.dto';
import { CreateReplyRequestDto } from './createReply.request.dto';
import { Reply } from './reply.entity';
import { GetCommentsResponseDto } from './GetComments.response.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  async getComment(id: string) {
    const response = await this.commentRepository.find({
      relations: ['user', 'replies', 'replies.user'],
      where: { contentId: id },
      order: { createdAt: 'ASC' },
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

  async createReply(id: string, createReplyRequestDto: CreateReplyRequestDto) {
    const { reply, commentId, userId } = createReplyRequestDto;
    const createReply = new Reply({
      reply,
      contentId: id,
      commentId,
      userId,
    });

    return await this.replyRepository.save(createReply);
  }
}
