import { Artwork } from '../entities/artwork.entity';

export class GetArtworkParamResponseDto {
  title: string;
  description: string;
  width: number;
  height: number;

  constructor(artwork: Artwork) {
    this.title = artwork.content.title;
    this.description = artwork.content.description;
    this.width = artwork.width;
    this.height = artwork.height;
  }
}
