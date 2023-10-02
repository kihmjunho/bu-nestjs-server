import { IsOptional } from 'class-validator';

export class CreateReplyRequestDto {
  @IsOptional()
  reply: string;

  @IsOptional()
  commentId: string;

  @IsOptional()
  userId: string;
}
