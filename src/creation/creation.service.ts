import { BadRequestException, Injectable } from '@nestjs/common';
import { CreationRepository } from './creation.repository';
import { FindCreationRequestDto } from './dto/findCreation.request.dto';

@Injectable()
export class CreationService {
  constructor(private readonly creationRepository: CreationRepository) {}

  async findAll(findCreationRequestDto: FindCreationRequestDto) {
    const { categoryName, subCategoryName } = findCreationRequestDto;
    if (
      (!categoryName && !subCategoryName) ||
      (categoryName && subCategoryName)
    ) {
      throw new BadRequestException(
        'categoryName 또는 subCategoryName 중 하나만 입력해야 합니다.',
      );
    }

    if (categoryName) {
      return await this.creationRepository.findByCategoryName(categoryName);
    }
    if (subCategoryName) {
      return await this.creationRepository.findBySubCategoryName(
        subCategoryName,
      );
    }
  }
}
