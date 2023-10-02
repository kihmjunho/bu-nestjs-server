import { IsOptional } from 'class-validator';

export class CreateCommentRequestDto {
  @IsOptional()
  comment: string;

  @IsOptional()
  userId: string;
}
