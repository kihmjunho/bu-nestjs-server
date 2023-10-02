import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async findAllComments() {
    return this.guestService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.guestService.findOne(id);
  }
  @Post()
  async createMessage(
    @Body() body: { text: string; userId: number; parentId?: string },
  ) {
    return this.guestService.createMessage(body.text, body.parentId);
  }
}
