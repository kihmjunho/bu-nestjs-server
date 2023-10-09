import { Exhibition } from './exhibition.entity';
export interface ExhibitionRepository {
  save(exhibition: Exhibition): Promise<Exhibition>;

  findByCategoryName(categoryName: string): Promise<Exhibition[]>;

  findOneById(id: string): Promise<Exhibition | null>;
}
