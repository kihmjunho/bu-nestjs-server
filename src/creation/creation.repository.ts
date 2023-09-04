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

  public async findByCategoryId(categoryName: string, query: PaginateQuery) {
    const queryBuilder = this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.category', 'category')
      .leftJoinAndSelect('content.subCategory', 'subCategory')
      .where('category.name = :categoryName', { categoryName });
    return await paginate(query, queryBuilder, {
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  public async findBySubCategoryId(
    SubCategoryName: string,
    query: PaginateQuery,
  ) {
    const queryBuilder = this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.category', 'category')
      .leftJoinAndSelect('content.subCategory', 'subCategory')
      .where('subCategory.name = :SubCategoryName', { SubCategoryName });
    return await paginate(query, queryBuilder, {
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }
}
