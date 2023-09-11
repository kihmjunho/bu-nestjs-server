import { Injectable } from '@nestjs/common';
import { CreationRepository } from './creation.repository';
import { FindCreationRequestDto } from './dto-request/findCreation.request.dto';
import { PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CreationService {
  constructor(private readonly creationRepository: CreationRepository) {}

  async findAll(
    findCreationRequestDto: FindCreationRequestDto,
    query: PaginateQuery,
  ) {
    const { categoryName, subCategoryName } = findCreationRequestDto;

    if (categoryName) {
      return await this.creationRepository.findByCategoryId(
        categoryName,
        query,
      );
    }

    if (subCategoryName) {
      console.log(subCategoryName);
      return await this.creationRepository.findBySubCategoryId(
        subCategoryName,
        query,
      );
    }
  }
}
