import { Injectable } from '@nestjs/common';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { Artwork } from './entities/artwork.entity';
import { DataSource } from 'typeorm';
import { Content } from './entities/content.entity';

@Injectable()
export class ArtworkCreationService {
  constructor(private dataSource: DataSource) {}

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
    await this.dataSource.manager.save(artwork);
  }
}
