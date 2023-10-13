import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { GuestbookService } from './guestbook.service';
import { JwtAuthGuard } from '../config/jwt/jwtAuth.guard';
import { CreateMessageRequestDto } from './dto/createMessage.request.dto';
import { UpdateCommentRequestDto } from '../comment/updateComment.request.dto';
import { UpdateMessageRequestDto } from './dto/updateMessage.request.dto';

@Controller('guestbooks')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  async findAllMessages() {
    return this.guestbookService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.guestbookService.findOne(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Request() req: any,
    @Body() createMessageRequestDto: CreateMessageRequestDto,
  ) {
    const { id } = req.user;
    return this.guestbookService.createMessage(createMessageRequestDto, id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Request() req: any,
    @Body() updateMessageRequestDto: UpdateMessageRequestDto,
  ) {
    const { id } = req.user;
    return this.guestbookService.update(updateMessageRequestDto, id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Request() req: any, @Param() commentId: string) {
    return await this.guestbookService.delete(commentId);
  }
}
