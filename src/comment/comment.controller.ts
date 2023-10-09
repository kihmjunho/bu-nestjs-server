import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './createComment.request.dto';
import { JwtAuthGuard } from '../config/jwt/jwtAuth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Query('content-id') contentId: string) {
    return await this.commentService.getComments(contentId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Request() req: any,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    console.log(req.user);
    return await this.commentService.createComment(createCommentRequestDto);
  }
}
