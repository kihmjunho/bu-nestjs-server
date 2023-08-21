import { IsOptional } from 'class-validator';

export class CreateContentRequestDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  categoryId: number;

  @IsOptional()
  subCategoryId: number;
}
