import { IsOptional } from 'class-validator';
import { UpdateContentRequestDto } from '../dto-create/updateContent.request.dto';

export class UpdateArtworkRequestDto extends UpdateContentRequestDto {
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
