import { IsEnum, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../../category/categoryType';

export class GetOneQueryRequestDto {
  @IsNotEmpty()
  @IsEnum(CategoryType)
  category: CategoryType;
}
