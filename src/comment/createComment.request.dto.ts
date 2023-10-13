import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentRequestDto {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  contentId: string;

  @IsOptional()
  commentParentId: string;
}
