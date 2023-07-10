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
    createContentRequestDto: CreateContentRequestDto,
  ): Promise<Content> {
    const {
      title,
      description,
      height,
      width,
      price,
      date,
      categoryId,
      subCategoryId,
    } = createContentRequestDto;

    let savedArtwork;
    if (price && height && width) {
      const artwork = new Artwork({
        height,
        width,
        price,
      });
      savedArtwork = await this.artworkRepository.save(artwork);
    }

    const exhibition = new Exhibition();
    let savedExhibition;
    if (date) {
      exhibition.date = date;
      savedExhibition = await this.exhibitionRepository.save(exhibition);
    }

    const content = new Content({ title, description });

    if (price) {
      content.artwork = savedArtwork;
    }
    if (date) {
      content.exhibition = savedExhibition;
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (category) {
      content.categoryId = categoryId;
    }

    const subCategory = await this.subCategoryRepository.findOne({
      where: { id: subCategoryId },
    });
    if (subCategory) {
      content.subCategoryId = subCategoryId;
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
