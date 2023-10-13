import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentRequestDto {
  @IsNotEmpty()
  commentId: string;

  @IsNotEmpty()
  comment: string;
}
