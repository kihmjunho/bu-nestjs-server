import { Exhibition } from './exhibition.entity';
import { Artwork } from '../creation-artwork/artwork.entity';

export interface ExhibitionRepository {
  save(artwork: Exhibition): Promise<Exhibition>;

  findAll(): Promise<Exhibition[]>;

  findOneById(id: string): Promise<Exhibition | null>;
}
