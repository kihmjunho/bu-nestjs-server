import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtworkRequestDto } from '../dto-create/createArtwork.request.dto';
import { Artwork } from '../entities/artwork.entity';
import { Content } from '../entities/content.entity';
import { ArtworkRepository } from './artwork.repository';
import { ARTWORK_REPOSITORY } from '../../common/constants/token.constant';
import { GetArtworkParamResponseDto } from '../dto-response/getArtwork.param.response.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { CommonRepository } from '../common/common.repository';
import { ArtworkFactory } from './artwork.factory';

@Injectable()
export class ArtworkCreationService {
  constructor(
    @Inject(ARTWORK_REPOSITORY)
    private readonly artworkRepository: ArtworkRepository,
    private readonly artworkFactory: ArtworkFactory,
  ) {}

  async create(createArtworkRequestDto: CreateArtworkRequestDto) {
    console.log('--------------');
    const {
      title,
      description,
      thumbnailId,
      categoryId,
      subCategoryId,
      height,
      width,
      materials,
      price,
      collector,
      year,
      images,
    } = createArtworkRequestDto;

    const artwork = this.artworkFactory.create({
      title,
      description,
      thumbnailId,
      categoryId,
      subCategoryId,
      height,
      width,
      materials,
      price,
      collector,
      year,
      images,
    });
    const data = await this.artworkRepository.save(artwork);

    return new CreateContentResponseDto(data.id);
  }

  async findAll() {
    return await this.artworkRepository.findAll();
  }

  async findOne(id: string): Promise<GetArtworkParamResponseDto> {
    const response: Artwork | null = await this.artworkRepository.findOneById(
      id,
    );
    console.log(response);
    if (!response) throw new Error('error');

    return new GetArtworkParamResponseDto(response);
  }
}
