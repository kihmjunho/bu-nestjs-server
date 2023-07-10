export class CreateContentRequestDto {
  title: string;
  description: string;
  height?: number;
  width?: number;
  materials?: string;
  year?: number;
  price?: number;
  collector?: string;
  date?: number;
  categoryId: number;
  subCategoryId: number;
}
