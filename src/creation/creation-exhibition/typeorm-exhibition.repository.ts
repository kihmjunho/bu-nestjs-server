import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExhibitionRepository } from './exhibition.repository';
import { Exhibition } from '../entities/exhibition.entity';

@Injectable()
export class TypeormExhibitionRepository implements ExhibitionRepository {
  constructor(
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
  ) {}

  async save(exhibition: Exhibition): Promise<Exhibition> {
    return await this.exhibitionRepository.save(exhibition);
  }

  async findAll(): Promise<Exhibition[]> {
    return await this.exhibitionRepository.find({
      relations: ['content'],
    });
  }

  async findOneById(id: string): Promise<Exhibition | null> {
    return await this.exhibitionRepository.findOne({
      where: {
        id,
      },
      relations: ['content'],
    });
  }
}
