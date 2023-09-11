import { Content } from '../entities/content.entity';

export class GetContentResponseDto {
  id: string;
  title: string;

  constructor(content: Content) {
    this.id = content.id;
    this.title = content.title;
  }
}
