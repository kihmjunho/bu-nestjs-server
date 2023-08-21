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
import { GetOneParamRequestDto } from './dto/getOne.param.request.dto';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { CreateExhibitionRequestDto } from './dto/createExhibition.request.dto';
import { CategoryType } from '../category/categoryType';
import { GetOneQueryRequestDto } from './dto/getOne.query.request.dto';

@Injectable()
export class CreationService {
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
    const { title, description, categoryId, subCategoryId } =
      createContentRequestDto as CreateArtworkRequestDto &
        CreateExhibitionRequestDto;

    let savedArtwork;
    if (categoryId === 2) {
      savedArtwork = await this.createArtwork(
        createContentRequestDto as CreateArtworkRequestDto,
      );
    }

    let savedExhibition;
    if (categoryId === 3) {
      savedExhibition = await this.createExhibition(
        createContentRequestDto as CreateExhibitionRequestDto,
      );
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

  async createArtwork(
    createArtworkRequestDto: CreateArtworkRequestDto,
  ): Promise<Artwork> {
    const artwork = new Artwork(createArtworkRequestDto);
    return await this.artworkRepository.save(artwork);
  }

  async createExhibition(
    createExhibitionRequestDto: CreateExhibitionRequestDto,
  ): Promise<Exhibition> {
    const exhibition = new Exhibition(createExhibitionRequestDto);
    return await this.exhibitionRepository.save(exhibition);
  }
  async getAll(): Promise<Content[]> {
    return await this.contentRepository.find({
      relations: ['category'],
    });
  }

  async getOne(
    getOneParamRequestDto: GetOneParamRequestDto,
    getOneQueryRequestDto: GetOneQueryRequestDto,
  ): Promise<Content> {
    const { id } = getOneParamRequestDto;
    const { category } = getOneQueryRequestDto;

    let content;
    if (
      category === CategoryType.ARTWORK ||
      category === CategoryType.EXHIBITION
    ) {
      content = await this.contentRepository.findOne({
        where: { id },
        relations: [category],
      });
    }

    if (category === CategoryType.POST) {
      content = await this.contentRepository.findOne({
        where: { id },
      });
    }

    if (!content) {
      throw new NotFoundException('없는 콘텐츠입니다', 'NOT_FOUND_CONTENT');
    }

    return content;
  }
}
