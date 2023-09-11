import { Exhibition } from '../entities/exhibition.entity';

export class GetExhibitionParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;

  constructor(exhibition: Exhibition) {
    this.title = exhibition.content.title;
    this.description = exhibition.content.description;
    this.thumbnail = exhibition.content.thumbnailId;
  }
}
