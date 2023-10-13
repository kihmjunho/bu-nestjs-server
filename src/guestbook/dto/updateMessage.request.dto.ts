import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMessageRequestDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  message: string;
}
