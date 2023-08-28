import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class CreationRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  public async findByCategoryId(categoryId: number, query: PaginateQuery) {
    return paginate(query, this.contentRepository, {
      relations: ['category', 'subCategory'],
      where: {
        category: {
          id: categoryId,
        },
      },
      sortableColumns: ['id'],
    });
  }

  public async findBySubCategoryId(
    subCategoryId: number,
    query: PaginateQuery,
  ) {
    return paginate(query, this.contentRepository, {
      relations: ['category', 'subCategory'],
      where: {
        subCategory: {
          id: subCategoryId,
        },
      },
      sortableColumns: ['id'],
    });

    return await this.contentRepository.find({
      relations: ['category', 'subCategory'],
      where: {
        subCategory: {
          id: subCategoryId,
        },
      },
    });
  }
}
