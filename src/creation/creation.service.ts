import { Injectable } from '@nestjs/common';
import { CreationRepository } from './creation.repository';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { FindByNameRequestDto } from './dto-request/findByName.request.dto';
import { Content } from './entities/content.entity';
import { GetCreationsResponseDto } from './dto-response/getCreations.response.dto';

@Injectable()
export class CreationService {
  constructor(private readonly creationRepository: CreationRepository) {}

  async findByCategory(
    findByNameRequestDto: FindByNameRequestDto,
    query: PaginateQuery,
  ): Promise<GetCreationsResponseDto> {
    const { name } = findByNameRequestDto;

    const paginatedCreations: Paginated<Content> =
      await this.creationRepository.findByCategory(name, query);

    return new GetCreationsResponseDto(paginatedCreations);
  }

  async findBySubCategory(
    findByNameRequestDto: FindByNameRequestDto,
    query: PaginateQuery,
  ): Promise<GetCreationsResponseDto> {
    const { name } = findByNameRequestDto;
    const paginatedCreations: Paginated<Content> =
      await this.creationRepository.findBySubCategory(name, query);
    return new GetCreationsResponseDto(paginatedCreations);
  }
}
