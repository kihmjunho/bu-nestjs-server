import { Artwork } from './artwork.entity';
import { extractCommonProperties } from '../common/common.helper';

export class GetArtworkParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  images: {
    url: string;
    seq: number;
  }[];
  width: number;
  height: number;
  materials: string;
  year: number;

  constructor(artwork: Artwork) {
    const commonProperties = extractCommonProperties(artwork.content);

    this.title = commonProperties.title;
    this.description = commonProperties.description;
    this.thumbnail = commonProperties.thumbnail;
    this.images = commonProperties.images;
    this.width = artwork.width;
    this.height = artwork.height;
    this.materials = artwork.materials;
    this.year = artwork.year;
  }
}
