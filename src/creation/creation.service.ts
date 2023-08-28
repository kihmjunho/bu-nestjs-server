import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreationRepository } from './creation.repository';
import { FindCreationRequestDto } from './dto/findCreation.request.dto';
import { PaginateQuery } from 'nestjs-paginate';
import { DataSource } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { SubCategory } from '../category/entities/subCategory.entity';

@Injectable()
export class CreationService {
  constructor(
    private readonly creationRepository: CreationRepository,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    findCreationRequestDto: FindCreationRequestDto,
    query: PaginateQuery,
  ) {
    const { categoryName, subCategoryName } = findCreationRequestDto;
    // if (
    //   (!categoryName && !subCategoryName) ||
    //   (categoryName && subCategoryName)
    // ) {
    //   throw new BadRequestException(
    //     'categoryName 또는 subCategoryName 중 하나만 입력해야 합니다.',
    //   );
    // }
    //
    // if (categoryName) {
    //   const category = await this.dataSource.getRepository(Category).findOne({
    //     where: {
    //       name: categoryName,
    //     },
    //   });
    //   if (!category) {
    //     throw new NotFoundException('존재하지 않는 카테고리입니다.');
    //   }

    return await this.creationRepository.findByCategoryId(categoryName, query);
  }
  //   if(subCategoryName) {
  //     const subCategory = await this.dataSource
  //       .getRepository(SubCategory)
  //       .findOne({
  //         where: {
  //           name: subCategoryName,
  //         },
  //       });
  //     if (!subCategory) {
  //       throw new NotFoundException('존재하지 않는 카테고리입니다.');
  //     }
  //     return await this.creationRepository.findBySubCategoryId(
  //       subCategory.id,
  //       query,
  //     );
  //   }
  // }
}
