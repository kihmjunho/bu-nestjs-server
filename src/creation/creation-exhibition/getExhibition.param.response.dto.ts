import { Exhibition } from './exhibition.entity';
import { GetCommonParamsResponseDto } from '../dto-response/getCommon.params.response.dto';

export class GetExhibitionParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  location: string;
  start: string;
  end: string;
  images: {
    url: string;
    seq: number;
  }[];
  year: number;
  userId: string;

  constructor(exhibition: Exhibition) {
    const commonProperties = new GetCommonParamsResponseDto(exhibition.content);
    this.title = commonProperties.title;
    this.description = commonProperties.description;
    this.thumbnail = commonProperties.thumbnail;
    this.images = commonProperties.images;
    this.year = exhibition.year;
    this.location = exhibition.location;
    this.start = exhibition.start;
    this.end = exhibition.end;
    this.userId = commonProperties.userId;
  }
}
