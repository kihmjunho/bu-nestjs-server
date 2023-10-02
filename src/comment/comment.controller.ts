import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './createComment.request.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Query('content-id') contentId: string) {
    return await this.commentService.getComments(contentId);
  }

  @Post()
  async createComment(
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    return await this.commentService.createComment(createCommentRequestDto);
  }
}
