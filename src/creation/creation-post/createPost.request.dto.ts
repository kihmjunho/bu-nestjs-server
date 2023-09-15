import { IsOptional } from 'class-validator';
import { CreateContentRequestDto } from '../dto-create/createContent.request.dto';

export class CreatePostRequestDto extends CreateContentRequestDto {
  @IsOptional()
  metaDescription: string;
}
