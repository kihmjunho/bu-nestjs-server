import { Inject, Injectable } from '@nestjs/common';
import { ExhibitionRepository } from './exhibition.repository';
import { EXHIBITION_REPOSITORY } from '../../common/constants/token.constant';
import { CreateExhibitionRequestDto } from '../dto-create/createExhibition.request.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { CommonRepository } from '../common/common.repository';
import { GetExhibitionParamResponseDto } from '../dto-response/getExhibition.param.response.dto';
import { ExhibitionFactory } from './exhibition.factory';

@Injectable()
export class ExhibitionCreationService {
  constructor(
    @Inject(EXHIBITION_REPOSITORY)
    private readonly exhibitionRepository: ExhibitionRepository,
    private readonly commonRepository: CommonRepository,
    private readonly exhibitionFactory: ExhibitionFactory,
  ) {}

  async create(createExhibitionRequestDto: CreateExhibitionRequestDto) {
    const {
      title,
      description,
      categoryId,
      subCategoryId,
      year,
      date,
      images,
    } = createExhibitionRequestDto;
    const exhibition = this.exhibitionFactory.create({
      title,
      description,
      categoryId,
      subCategoryId,
      year,
      date,
      images,
    });
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
