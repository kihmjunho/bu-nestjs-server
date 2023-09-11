import { Content } from '../entities/content.entity';

export class GetContentResponseDto {
  id: string;
  title: string;
  thumbnail: string;

  constructor(content: Content) {
    this.id = content.id;
    this.title = content.title;
    this.thumbnail = content.thumbnailId;
  }
}
