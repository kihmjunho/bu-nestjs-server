import { IsOptional } from 'class-validator';
import { CreateContentRequestDto } from '../dto-create/createContent.request.dto';

export class CreateExhibitionRequestDto extends CreateContentRequestDto {
  @IsOptional()
  location: string;

  @IsOptional()
  city: string;

  @IsOptional()
  year: number;

  @IsOptional()
  start: string;

  @IsOptional()
  end: string;

  @IsOptional()
  prefaceTitle: string;

  @IsOptional()
  prefaceAuthor: string;

  @IsOptional()
  prefaceDescription: string;

  @IsOptional()
  etc: string;
}
