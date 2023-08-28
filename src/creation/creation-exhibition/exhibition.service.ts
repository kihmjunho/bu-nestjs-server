import { Inject, Injectable } from '@nestjs/common';
import { Content } from '../entities/content.entity';
import { ExhibitionRepository } from './exhibition.repository';
import { EXHIBITION_REPOSITORY } from '../../common/constants/token.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibition } from '../entities/exhibition.entity';
import { CreateExhibitionRequestDto } from '../dto/createExhibition.request.dto';

@Injectable()
export class ExhibitionCreationService {
  constructor(
    @Inject(EXHIBITION_REPOSITORY)
    private readonly exhibitionRepository: ExhibitionRepository,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository2: Repository<Exhibition>,
  ) {}

  async create(createExhibitionRequestDto: CreateExhibitionRequestDto) {
    const {
      // materials,
      title,
      description,
      categoryId,
      subCategoryId,
      year,
      date,
      // price,
      // collector,
      // year,
      // width,
    } = createExhibitionRequestDto;
    const content = new Content({
      title,
      description,
      categoryId,
      subCategoryId,
    });
    const exhibition = new Exhibition({ year, date, content });
    await this.exhibitionRepository.save(exhibition);
  }

  async findAll() {
    return await this.exhibitionRepository.findAll();
  }

  async findOne(id: string) {
    return await this.exhibitionRepository.findOneById(id);
  }
}
