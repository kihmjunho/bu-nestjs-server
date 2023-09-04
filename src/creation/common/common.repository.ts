import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from '../../category/entities/subCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonRepository {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  async findCategoryNameById(id: number) {
    const response = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!response) {
      throw new NotFoundException('카테고리를 찾을 수 없습니다.');
    }
    return response.name;
  }
}
