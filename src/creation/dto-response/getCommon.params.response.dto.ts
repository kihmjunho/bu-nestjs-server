import { Content } from '../entities/content.entity';

export class GetCommonParamsResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  images: { url: string; seq: number }[] = [];
  subCategoryId: number;
  userId: string;

  constructor(content: Content) {
    this.title = content.title;
    this.description = content.description;

    for (const item of content.creationImages) {
      if (item.seq === 1) {
        this.thumbnail = item.url;
      } else {
        this.images.push(item);
      }
    }

    this.subCategoryId = content.subCategoryId;
    this.userId = content.userId;
  }
}
