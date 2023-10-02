import { ArtworkRepository } from './artwork.repository';
import { Artwork } from './artwork.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArtworkRequestDto } from './updateArtwork.request.dto';
import { Content } from '../entities/content.entity';

@Injectable()
export class TypeormArtworkRepository implements ArtworkRepository {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
  ) {}

  async save(artwork: Artwork): Promise<Artwork> {
    return await this.artworkRepository.save(artwork);
  }

  async findAll(): Promise<Artwork[]> {
    return await this.artworkRepository.find({
      relations: ['content'],
    });
  }

  async findOneById(id: string): Promise<Artwork | null> {
    return await this.artworkRepository.findOne({
      where: {
        id,
      },
      relations: ['content', 'content.creationImages'],
    });
  }

  async update(
    id: string,
    updateArtworkRequestDto: UpdateArtworkRequestDto,
  ): Promise<void> {
    const content = await this.contentRepository.findOne({
      where: {
        id,
      },
    });

    const artwork = await this.findOneById(id);
    if (!content || !artwork) {
      throw new NotFoundException('존재하지 않는 게시글입니다');
    }
    const { title, description, subCategoryId, materials } =
      updateArtworkRequestDto;

    if (updateArtworkRequestDto) {
      content.title = title;
      content.description = description;
      content.subCategoryId = subCategoryId;
      artwork.materials = materials;
    }

    await this.contentRepository.manager.transaction(async (manager) => {
      await manager.save(content);
      await manager.save(artwork);
    });
  }

  async delete(id: string): Promise<any> {
    console.log('kk', id);
  }
}
