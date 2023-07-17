import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { GetOneParamRequestDto } from './dto/getOne.param.request.dto';
import { Content } from './entities/content.entity';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { CreateExhibitionRequestDto } from './dto/createExhibition.request.dto';
import { CategoryType } from '../category/categoryType';
import { GetOneQueryRequestDto } from './dto/getOne.query.request.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async create(
    @Body()
    createContentRequestDto:
      | CreateContentRequestDto
      | CreateArtworkRequestDto
      | CreateExhibitionRequestDto,
  ): Promise<Content> {
    return await this.contentService.create(createContentRequestDto);
  }

  @Get()
  async getContents(): Promise<Content[]> {
    return await this.contentService.getAll();
  }

  @Get('/:id')
  async getOne(
    @Param() getOneParamRequestDto: GetOneParamRequestDto,
    @Query() getOneQueryRequestDto: GetOneQueryRequestDto,
  ): Promise<Content> {
    return await this.contentService.getOne(
      getOneParamRequestDto,
      getOneQueryRequestDto,
    );
  }
}
