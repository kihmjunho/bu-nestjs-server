import { ArtworkRepository } from './artwork.repository';
import { Artwork } from '../entities/artwork.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormArtworkRepository implements ArtworkRepository {
  constructor(
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
}
