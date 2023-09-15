import { Controller, Get, Query } from '@nestjs/common';
import { CreationService } from './creation.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FindByNameRequestDto } from './dto-request/findByName.request.dto';
import { GetCreationsResponseDto } from './dto-response/getCreations.response.dto';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

  @Get('category')
  async findByCategory(
    @Query() findByNameRequestDto: FindByNameRequestDto,
    @Paginate() query: PaginateQuery,
  ): Promise<GetCreationsResponseDto> {
    return await this.creationService.findByCategory(
      findByNameRequestDto,
      query,
    );
  }

  @Get('subCategory')
  async findBySubCategory(
    @Query() findByNameRequestDto: FindByNameRequestDto,
    @Paginate() query: PaginateQuery,
  ): Promise<GetCreationsResponseDto> {
    return await this.creationService.findBySubCategory(
      findByNameRequestDto,
      query,
    );
  }
}
