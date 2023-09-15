import { IsOptional } from 'class-validator';
import { CreateContentRequestDto } from '../dto-create/createContent.request.dto';

export class CreateArtworkRequestDto extends CreateContentRequestDto {
  @IsOptional()
  height: number;

  @IsOptional()
  width: number;

  @IsOptional()
  materials: string;

  @IsOptional()
  year: number;

  @IsOptional()
  price: number;

  @IsOptional()
  collector: string;
}
