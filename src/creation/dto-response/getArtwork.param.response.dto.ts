import { Artwork } from '../entities/artwork.entity';

export class GetArtworkParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  width: number;
  height: number;

  constructor(artwork: Artwork) {
    this.title = artwork.content.title;
    this.description = artwork.content.description;
    this.thumbnail = artwork.content.thumbnailId;
    this.width = artwork.width;
    this.height = artwork.height;
  }
}