import { Exhibition } from '../entities/exhibition.entity';

export class GetExhibitionParamResponseDto {
  title: string;
  description: string;

  constructor(exhibition: Exhibition) {
    this.title = exhibition.content.title;
    this.description = exhibition.content.description;
  }
}
