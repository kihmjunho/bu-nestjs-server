import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './createComment.request.dto';
import { CreateReplyRequestDto } from './createReply.request.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:id')
  async getComments(@Param('id') id: string) {
    return await this.commentService.getComment(id);
  }

  @Post()
  async createComment(
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    return await this.commentService.createComment(createCommentRequestDto);
  }

  @Post('/:id/reply')
  async createReply(
    @Param('id') id: string,
    @Body() createReplyRequestDto: CreateReplyRequestDto,
  ) {
    return await this.commentService.createReply(id, createReplyRequestDto);
  }
}
