import { Paginated } from 'nestjs-paginate';
import { Content } from '../entities/content.entity';

export class GetCreationsResponseDto {
  data: {
    id: string;
    title: string;
    thumbnail: string;
    category: string;
    subCategory: string;
  }[];
  totalPages: number;

  constructor(paginatedCreations: Paginated<Content>) {
    this.data = paginatedCreations.data.map((item: Content) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.creationImages[0].url,
      category: item.category.name,
      subCategory: item.subCategory.name,
    }));
    this.totalPages = paginatedCreations.meta.totalPages;
  }
}
