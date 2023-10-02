import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './createComment.request.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Query('content-id') contentId: string) {
    return await this.commentService.getComments(contentId);
  }

  @Post('/:id')
  async createComment(
    @Param('id') id: string,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    return await this.commentService.createComment(id, createCommentRequestDto);
  }
}
