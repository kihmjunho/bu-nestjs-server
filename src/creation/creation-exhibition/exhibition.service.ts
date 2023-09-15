import { Inject, Injectable } from '@nestjs/common';
import { ExhibitionRepository } from './exhibition.repository';
import { EXHIBITION_REPOSITORY } from '../../common/constants/token.constant';
import { CreateExhibitionRequestDto } from './createExhibition.request.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { GetExhibitionParamResponseDto } from './getExhibition.param.response.dto';
import { ExhibitionFactory } from './exhibition.factory';

@Injectable()
export class ExhibitionCreationService {
  constructor(
    @Inject(EXHIBITION_REPOSITORY)
    private readonly exhibitionRepository: ExhibitionRepository,
    private readonly exhibitionFactory: ExhibitionFactory,
  ) {}

  async create(createExhibitionRequestDto: CreateExhibitionRequestDto) {
    const exhibition = this.exhibitionFactory.create(
      createExhibitionRequestDto,
    );
    const data = await this.exhibitionRepository.save(exhibition);

    return new CreateContentResponseDto(data.id);
  }

  async findAll() {
    return await this.exhibitionRepository.findAll();
  }

  async findOne(id: string) {
    const response = await this.exhibitionRepository.findOneById(id);

    if (!response) {
      throw new Error('ll');
    }
    return new GetExhibitionParamResponseDto(response);
  }
}
