import { Artwork } from '../entities/artwork.entity';

export interface ArtworkRepository {
  save(artwork: Artwork): Promise<Artwork>;

  findAll(): Promise<Artwork[]>;

  findOneById(id: string): Promise<Artwork | null>;
}
