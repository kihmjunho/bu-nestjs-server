import { IsNotEmpty } from 'class-validator';

export class CreateContentRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  subCategoryId: number;
}
