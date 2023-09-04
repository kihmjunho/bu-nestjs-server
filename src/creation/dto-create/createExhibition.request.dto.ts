import { IsOptional } from 'class-validator';
import { CreateContentRequestDto } from './createContent.request.dto';

export class CreateExhibitionRequestDto extends CreateContentRequestDto {
  @IsOptional()
  year: number;

  @IsOptional()
  date: number;
}
