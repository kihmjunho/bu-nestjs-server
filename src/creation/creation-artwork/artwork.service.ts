import { Inject, Injectable } from '@nestjs/common';
import { CreateArtworkRequestDto } from '../dto/createArtwork.request.dto';
import { Artwork } from '../entities/artwork.entity';
import { Content } from '../entities/content.entity';
import { ArtworkRepository } from './artwork.repository';
import { ARTWORK_REPOSITORY } from '../../common/constants/token.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtworkCreationService {
  constructor(
    @Inject(ARTWORK_REPOSITORY)
    private readonly artworkRepository: ArtworkRepository,
    @InjectRepository(Artwork)
    private readonly artworkRepository2: Repository<Artwork>,
  ) {}

  async create(createArtworkRequestDto: CreateArtworkRequestDto) {
    const {
      // materials,
      title,
      description,
      categoryId,
      subCategoryId,
      height,
      // price,
      // collector,
      // year,
      width,
    } = createArtworkRequestDto;
    const content = new Content({
      title,
      description,
      categoryId,
      subCategoryId,
    });
    const artwork = new Artwork({ height, width, content });
    await this.artworkRepository.save(artwork);
  }

  async findAll() {
    return await this.artworkRepository.findAll();
  }

  async findOne(id: string) {
    return await this.artworkRepository.findOneById(id);
  }
}
