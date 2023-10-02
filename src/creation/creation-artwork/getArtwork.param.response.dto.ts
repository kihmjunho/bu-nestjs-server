import { Artwork } from './artwork.entity';
import { GetCommonParamsResponseDto } from '../dto-response/getCommon.params.response.dto';

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
  price: number;
  collector: string;
  subCategoryId: number;
  userId: string;

  constructor(artwork: Artwork) {
    const commonProperties = new GetCommonParamsResponseDto(artwork.content);

    this.title = commonProperties.title;
    this.description = commonProperties.description;
    this.thumbnail = commonProperties.thumbnail;
    this.images = commonProperties.images;
    this.width = artwork.width;
    this.height = artwork.height;
    this.materials = artwork.materials;
    this.year = artwork.year;
    this.price = artwork.price;
    this.collector = artwork.collector;
    this.subCategoryId = commonProperties.subCategoryId;
    this.userId = commonProperties.userId;
  }
}
