import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContentRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  thumbnailId: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  subCategoryId: number;

  @IsOptional()
  images: string[];
}
