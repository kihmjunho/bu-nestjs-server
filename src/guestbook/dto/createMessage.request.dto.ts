import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageRequestDto {
  @IsNotEmpty()
  message: string;

  @IsOptional()
  messageParentId: string;
}
