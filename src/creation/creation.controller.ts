import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreationService } from './creation.service';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

  @Get()
  async findAll() {
    return await this.creationService.findAll();
  }

  // @Get('/:id')
  // async findOne(@Param('id') id: string) {
  //   return await this.exhibitionCreationService.findOne(id);
  // }
}
