import { Injectable } from '@nestjs/common';
import { CreationRepository } from './creation.repository';
import { FindCreationRequestDto } from './dto-request/findCreation.request.dto';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Content } from './entities/content.entity';
import { GetCreationsResponseDto } from './dto-response/getCreations.response.dto';

@Injectable()
export class CreationService {
  constructor(private readonly creationRepository: CreationRepository) {}

  async findAll(
    findCreationRequestDto: FindCreationRequestDto,
    query: PaginateQuery,
  ) {
    const { categoryName, subCategoryName } = findCreationRequestDto;

    if (categoryName) {
      const paginatedCreations: Paginated<Content> =
        await this.creationRepository.findByCategoryName(categoryName, query);

      return new GetCreationsResponseDto(paginatedCreations);
    }

    if (subCategoryName) {
      const paginatedCreations: Paginated<Content> =
        await this.creationRepository.findBySubCategoryName(
          subCategoryName,
          query,
        );
      return new GetCreationsResponseDto(paginatedCreations);
    }
  }
}
