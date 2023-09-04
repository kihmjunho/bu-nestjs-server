import { IsOptional } from 'class-validator';
import { CreateContentRequestDto } from './createContent.request.dto';

export class CreatePostRequestDto extends CreateContentRequestDto {
  @IsOptional()
  metaDescription: string;
}
