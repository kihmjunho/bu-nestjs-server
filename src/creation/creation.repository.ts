import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class CreationRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async findByCategoryId(categoryName: string, query: PaginateQuery) {
    return paginate(query, this.categoryRepository, {
      relations: ['contents'],
      where: {
        name: categoryName,
      },
      sortableColumns: ['id', 'contents.createdAt'],
      defaultSortBy: [['contents.createdAt', 'DESC']],
    });
  }

  public async findBySubCategoryId(
    subCategoryId: string,
    query: PaginateQuery,
  ) {
    return paginate(query, this.contentRepository, {
      relations: ['category', 'subCategory'],
      where: {
        subCategory: {
          name: subCategoryId,
        },
      },
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    });

    // return await this.contentRepository.find({
    //   relations: ['category', 'subCategory'],
    //   where: {
    //     subCategory: {
    //       id: subCategoryId,
    //     },
    //   },
    // });
  }
}
