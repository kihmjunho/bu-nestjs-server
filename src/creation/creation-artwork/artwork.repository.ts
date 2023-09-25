import { Artwork } from './artwork.entity';
import { UpdateArtworkRequestDto } from './updateArtwork.request.dto';

export interface ArtworkRepository {
  save(artwork: Artwork): Promise<Artwork>;

  findAll(): Promise<Artwork[]>;

  findOneById(id: string): Promise<Artwork | null>;

  update(
    id: string,
    updateArtworkRequestDto: UpdateArtworkRequestDto,
  ): Promise<void>;

  delete(id: string): Promise<any>;
}
