import { Inject, Injectable } from '@nestjs/common';
import { CreateArtworkRequestDto } from './createArtwork.request.dto';
import { Artwork } from './artwork.entity';
import { ArtworkRepository } from './artwork.repository';
import { ARTWORK_REPOSITORY } from '../../common/constants/token.constant';
import { GetArtworkParamResponseDto } from './getArtwork.param.response.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { ArtworkFactory } from './artwork.factory';
import { UpdateArtworkRequestDto } from './updateArtwork.request.dto';
import { CreationImage } from '../entities/creationImage.entity';

@Injectable()
export class ArtworkCreationService {
  constructor(
    @Inject(ARTWORK_REPOSITORY)
    private readonly artworkRepository: ArtworkRepository,
    private readonly artworkFactory: ArtworkFactory,
  ) {}

  async create(createArtworkRequestDto: CreateArtworkRequestDto) {
    const artwork = this.artworkFactory.create(createArtworkRequestDto);
    const data = await this.artworkRepository.save(artwork);

    return new CreateContentResponseDto(data.id);
  }

  async findAll() {
    return await this.artworkRepository.findAll();
  }

  async findOne(id: string): Promise<GetArtworkParamResponseDto> {
    const artwork: Artwork | null = await this.artworkRepository.findOneById(
      id,
    );

    if (!artwork) {
      throw new Error('error');
    }

    let thumbnail;
    const images: CreationImage[] = [];
    for (const item of artwork.content.creationImages) {
      if (item.seq === 1) {
        thumbnail = item.url;
      } else {
        images.push(item);
      }
    }

    const response = {
      ...artwork,
      content: {
        ...artwork.content,
        thumbnail,
        images,
      },
    };

    return new GetArtworkParamResponseDto(response);
  }

  async update(id: string, updateArtworkRequestDto: UpdateArtworkRequestDto) {
    return await this.artworkRepository.update(id, updateArtworkRequestDto);
  }

  async deleteArtwork(id: string) {
    console.log('service', id);
    return await this.artworkRepository.delete(id);
  }
}
