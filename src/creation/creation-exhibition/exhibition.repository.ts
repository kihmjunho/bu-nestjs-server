import { Exhibition } from '../entities/exhibition.entity';
import { Artwork } from '../entities/artwork.entity';

export interface ExhibitionRepository {
  save(artwork: Exhibition): Promise<Exhibition>;

  findAll(): Promise<Exhibition[]>;

  findOneById(id: string): Promise<Exhibition | null>;
}
