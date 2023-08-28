import { Controller, Get, Query } from '@nestjs/common';
import { CreationService } from './creation.service';
import { FindCreationRequestDto } from './dto/findCreation.request.dto';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

  @Get()
  async findAll(@Query() findCreationRequestDto: FindCreationRequestDto) {
    return await this.creationService.findAll(findCreationRequestDto);
  }

  // @Get('/:id')
  // async findOne(@Param('id') id: string) {
  //   return await this.exhibitionCreationService.findOne(id);
  // }
}
