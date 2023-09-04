import { IsOptional } from 'class-validator';

export class FindCreationRequestDto {
  @IsOptional()
  categoryName: string;

  @IsOptional()
  subCategoryName: string;
}
