import { IsOptional } from 'class-validator';

export class CreateCommentRequestDto {
  @IsOptional()
  comment: string;

  @IsOptional()
  contentId: string;

  @IsOptional()
  parentId: string;

  @IsOptional()
  userId: string;
}
