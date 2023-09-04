import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtworkRequestDto } from '../dto-create/createArtwork.request.dto';
import { Artwork } from '../entities/artwork.entity';
import { Content } from '../entities/content.entity';
import { ArtworkRepository } from './artwork.repository';
import { ARTWORK_REPOSITORY } from '../../common/constants/token.constant';
import { GetArtworkParamResponseDto } from '../dto-response/getArtwork.param.response.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { CommonRepository } from '../common/common.repository';

@Injectable()
export class ArtworkCreationService {
  constructor(
    @Inject(ARTWORK_REPOSITORY)
    private readonly artworkRepository: ArtworkRepository,
    private readonly commonRepository: CommonRepository,
  ) {}

  async create(createArtworkRequestDto: CreateArtworkRequestDto) {
    const {
      title,
      description,
      thumbnail,
      categoryId,
      subCategoryId,
      height,
      width,
      materials,
      price,
      collector,
      year,
    } = createArtworkRequestDto;

    const content = new Content({
      title,
      description,
      thumbnail,
      categoryId,
      subCategoryId,
    });
    const artwork = new Artwork({
      height,
      width,
      materials,
      price,
      collector,
      year,
      content,
    });
    const data = await this.artworkRepository.save(artwork);

    const name = await this.commonRepository.findCategoryNameById(
      subCategoryId,
    );

    const url = `/artwork/${name}/${data.id}`;
    return new CreateContentResponseDto(url);
  }

  async findAll() {
    return await this.artworkRepository.findAll();
  }

  async findOne(id: string): Promise<GetArtworkParamResponseDto> {
    const response: Artwork | null = await this.artworkRepository.findOneById(
      id,
    );

    if (!response) throw new Error('error');

    return new GetArtworkParamResponseDto(response);
  }
}
