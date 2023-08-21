import { Inject, Injectable } from '@nestjs/common';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { Artwork } from './entities/artwork.entity';
import { Content } from './entities/content.entity';
import { ArtworkRepository } from './artwork.repository';
import { ARTWORK_REPOSITORY } from '../common/constants/token.constant';

@Injectable()
export class ArtworkCreationService {
  constructor(
    @Inject(ARTWORK_REPOSITORY)
    private readonly artworkRepository: ArtworkRepository,
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
}
