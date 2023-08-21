import { IsNotEmpty } from 'class-validator';

export class GetOneParamRequestDto {
  @IsNotEmpty()
  id: string;
}
