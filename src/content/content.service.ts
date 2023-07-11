// src/posts/content.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { Artwork } from './entities/artwork.entity';
import { Category } from '../category/entities/category.entity';
import { SubCategory } from '../category/entities/subCategory.entity';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { Exhibition } from './entities/exhibition.entity';
import { GetOneRequestDto } from './dto/getOne.request.dto';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { CreateExhibitionRequestDto } from './dto/createExhibition.request.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(
    createContentRequestDto:
      | CreateContentRequestDto
      | CreateArtworkRequestDto
      | CreateExhibitionRequestDto,
  ): Promise<Content> {
    const {
      title,
      description,
      height,
      width,
      year,
      date,
      categoryId,
      subCategoryId,
    } = createContentRequestDto as CreateArtworkRequestDto &
      CreateExhibitionRequestDto;

    let savedArtwork;
    if (width) {
      const artwork = new Artwork({
        height,
        width,
      });

      savedArtwork = await this.artworkRepository.save(artwork);
    }

    let savedExhibition;
    if (date) {
      const exhibition = new Exhibition({
        year,
        date,
      });

      savedExhibition = await this.exhibitionRepository.save(exhibition);
    }
    const content = new Content({ title, description });

    if (savedArtwork) {
      content.artwork = savedArtwork;
    }

    if (savedExhibition) {
      content.exhibition = savedExhibition;
    }

    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (category) {
        content.categoryId = categoryId;
      }
    }

    if (subCategoryId) {
      const subCategory = await this.subCategoryRepository.findOne({
        where: { id: subCategoryId },
      });
      if (subCategory) {
        content.subCategoryId = subCategoryId;
      }
    }

    return await this.contentRepository.save(content);
  }

  async getAll(): Promise<Content[]> {
    return await this.contentRepository.find();
  }

  async getOne(getOneRequestDto: GetOneRequestDto) {
    const { category, id } = getOneRequestDto;

    if (category === 'artwork') {
      console.log(id);
      const content = await this.contentRepository
        .createQueryBuilder('content')
        .leftJoinAndSelect('content.artwork', 'artwork')
        .where('content.id = :id', { id })
        .getOne();

      if (!content) {
        throw new NotFoundException('존재하지 않는 게시글입니다');
      }

      return content;
    }

    if (category === 'exhibition') {
      const content = await this.contentRepository.findOne({
        where: { id },
        relations: ['artwork'],
      });
      // const content = await this.contentRepository
      //   .createQueryBuilder('content')
      //   .leftJoinAndSelect('content.exhibition', 'exhibition')
      //   .where('content.id = :id', { id })
      //   .getOne();

      if (!content) {
        throw new NotFoundException('존재하지 않는 게시글입니다');
      }

      return content;
    }

    return await this.contentRepository.findOneBy({ id });
  }
}
