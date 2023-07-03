export class CreatePostRequestDto {
  title: string;
  size?: number;
  date?: number;
  categoryId: number;
  subCategoryId: number;
}
