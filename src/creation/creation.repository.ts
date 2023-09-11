import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { GetContentResponseDto } from './dto-response/getContent.response.dto';

@Injectable()
export class CreationRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  public async findByCategoryId(categoryName: string, query: PaginateQuery) {
    console.log(categoryName);
    const queryBuilder = this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.category', 'category')
      .leftJoinAndSelect('content.subCategory', 'subCategory')
      .leftJoinAndSelect('content.creationImages', 'creationImages')
      .where('category.name = :categoryName', { categoryName });
    const response = await paginate(query, queryBuilder, {
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    });

    try {
      return {
        data: response.data.map((item: Content) => ({
          id: item.id,
          title: item.title,
          thumbnail:
            item.creationImages !== undefined ? item.creationImages[0].url : '',
          category: item.category.name,
          subCategory: item.subCategory.name,
        })),
        totalPages: response.meta.totalPages,
      };
    } catch (e) {}
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
    const response = await paginate(query, queryBuilder, {
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    });

    try {
      return {
        data: response.data.map((item: Content) => ({
          id: item.id,
          title: item.title,
          thumbnail:
            item.creationImages !== undefined ? item.creationImages[0].url : '',
          category: item.category.name,
          subCategory: item.subCategory.name,
        })),
        totalPages: response.meta.totalPages,
      };
    } catch (e) {}
  }
}
