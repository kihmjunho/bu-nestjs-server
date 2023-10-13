import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './createComment.request.dto';
import { JwtAuthGuard } from '../config/jwt/jwtAuth.guard';
import { UpdateCommentRequestDto } from './updateComment.request.dto';
import { CreateMessageRequestDto } from '../guestbook/dto/createMessage.request.dto';
import { GuestbookService } from '../guestbook/guestbook.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Query('content-id') contentId: string) {
    return await this.commentService.getComments(contentId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Request() req: any,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    const { id } = req.user;
    return await this.commentService.createComment(createCommentRequestDto, id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Request() req: any,
    @Body() updateCommentRequestDto: UpdateCommentRequestDto,
  ) {
    const { id } = req.user;
    return this.commentService.update(updateCommentRequestDto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Request() req: any, @Param() commentId: string) {
    return await this.commentService.delete(commentId);
  }
}
