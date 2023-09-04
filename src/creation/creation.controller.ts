import { Controller, Get, Query } from '@nestjs/common';
import { CreationService } from './creation.service';
import { FindCreationRequestDto } from './dto-request/findCreation.request.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

  @Get()
  async findAll(
    @Query() findCreationRequestDto: FindCreationRequestDto,
    @Paginate() query: PaginateQuery,
  ) {
    // console.log(query);
    console.log('fetch');
    return await this.creationService.findAll(findCreationRequestDto, query);
  }
}
