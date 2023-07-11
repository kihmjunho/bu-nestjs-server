import { IsNotEmpty } from 'class-validator';

export class GetOneRequestDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  id: string;
}
