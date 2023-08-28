import { Controller, Get, Query } from '@nestjs/common';
import { CreationService } from './creation.service';
import { FindCreationRequestDto } from './dto/findCreation.request.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

  @Get()
  async findAll(
    @Query() findCreationRequestDto: FindCreationRequestDto,
    @Paginate() query: PaginateQuery,
  ) {
    console.log(query);
    return await this.creationService.findAll(findCreationRequestDto, query);
  }

  // @Get('/:id')
  // async findOne(@Param('id') id: string) {
  //   return await this.exhibitionCreationService.findOne(id);
  // }
}
