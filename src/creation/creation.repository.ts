import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreationRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  public async findByCategoryName(categoryName: string) {
    return await this.contentRepository.find({
      relations: ['category', 'subCategory'],
      where: {
        category: {
          name: categoryName,
        },
      },
    });
  }

  public async findBySubCategoryName(subCategoryName: string) {
    return await this.contentRepository.find({
      relations: ['category', 'subCategory'],
      where: {
        subCategory: {
          name: subCategoryName,
        },
      },
    });
  }
}
