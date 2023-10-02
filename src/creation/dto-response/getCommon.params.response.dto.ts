export class GetCommonParamsResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  images: { url: string; seq: number }[] = [];
  subCategoryId: number;
  userId: string;

  constructor(content) {
    this.title = content.title;
    this.description = content.description;

    this.thumbnail = content.thumbnail;
    this.images = content.images;

    this.subCategoryId = content.subCategoryId;
    this.userId = content.userId;
  }
}
