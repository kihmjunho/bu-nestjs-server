import { IsOptional } from 'class-validator';

export class FindByNameRequestDto {
  @IsOptional()
  name: string;
}
