import { Inject, Injectable } from '@nestjs/common';
import { Content } from '../entities/content.entity';
import { ExhibitionRepository } from './exhibition.repository';
import { EXHIBITION_REPOSITORY } from '../../common/constants/token.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from '../entities/exhibition.entity';
import { CreateExhibitionRequestDto } from '../dto-create/createExhibition.request.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { CommonRepository } from '../common/common.repository';
import { GetExhibitionParamResponseDto } from '../dto-response/getExhibition.param.response.dto';

@Injectable()
export class ExhibitionCreationService {
  constructor(
    @Inject(EXHIBITION_REPOSITORY)
    private readonly exhibitionRepository: ExhibitionRepository,
    private readonly commonRepository: CommonRepository,
  ) {}

  async create(createExhibitionRequestDto: CreateExhibitionRequestDto) {
    const {
      title,
      description,
      thumbnail,
      categoryId,
      subCategoryId,
      year,
      date,
    } = createExhibitionRequestDto;

    const content = new Content({
      title,
      description,
      thumbnail,
      categoryId,
      subCategoryId,
    });
    const exhibition = new Exhibition({ year, date, content });
    const data = await this.exhibitionRepository.save(exhibition);

    const name = await this.commonRepository.findCategoryNameById(
      subCategoryId,
    );

    const url = `/exhibition/${name}/${data.id}`;

    return new CreateContentResponseDto(url);
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
