import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContentRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  thumbnail: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  subCategoryId: number;

  @IsOptional()
  images: string[];
}
