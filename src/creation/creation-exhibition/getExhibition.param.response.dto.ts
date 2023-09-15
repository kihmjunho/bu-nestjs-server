import { Exhibition } from './exhibition.entity';
import { extractCommonProperties } from '../common/common.helper';

export class GetExhibitionParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  images: {
    url: string;
    seq: number;
  }[];
  year: number;

  constructor(exhibition: Exhibition) {
    const commonProperties = extractCommonProperties(exhibition.content);
    this.title = commonProperties.title;
    this.description = commonProperties.description;
    this.thumbnail = commonProperties.thumbnail;
    this.images = commonProperties.images;
    this.year = exhibition.year;
  }
}
