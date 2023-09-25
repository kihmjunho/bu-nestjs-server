import { IsNotEmpty } from 'class-validator';

export class UpdateContentRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  subCategoryId: number;
}
