import { Injectable } from '@nestjs/common';
import { CreationRepository } from './creation.repository';

@Injectable()
export class CreationService {
  constructor(private readonly creationRepository: CreationRepository) {}

  async findAll() {
    return await this.creationRepository.findAll();
  }

  // async findOne(id: string) {
  //   return await this.exhibitionRepository.findOneById(id);
  // }
}
