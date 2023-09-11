import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { GetContentResponseDto } from './dto-response/getContent.response.dto';

@Injectable()
export class CreationRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  public async findByCategoryName(categoryName: string, query: PaginateQuery) {
    const queryBuilder = this.getContentQueryBuilder().where(
      'category.name = :categoryName',
      { categoryName },
    );
    return this.getPaginationData(query, queryBuilder);
  }

  public async findBySubCategoryName(
    SubCategoryName: string,
    query: PaginateQuery,
  ) {
    const queryBuilder = this.getContentQueryBuilder().where(
      'subCategory.name = :SubCategoryName',
      { SubCategoryName },
    );
    return this.getPaginationData(query, queryBuilder);
  }

  private getContentQueryBuilder() {
    return this.contentRepository
      .createQueryBuilder('content')
      .leftJoinAndSelect('content.category', 'category')
      .leftJoinAndSelect('content.subCategory', 'subCategory')
      .leftJoinAndSelect('content.creationImages', 'creationImages');
  }

  private async getPaginationData(
    query: PaginateQuery,
    queryBuilder: SelectQueryBuilder<Content>,
  ) {
    return await paginate(query, queryBuilder, {
      sortableColumns: ['id', 'createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }
}
