import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentRequestDto } from './dto/createContent.request.dto';
import { GetOneRequestDto } from './dto/getOne.request.dto';
import { Content } from './entities/content.entity';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { CreateExhibitionRequestDto } from './dto/createExhibition.request.dto';

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
  async getAllPosts(): Promise<Content[]> {
    return await this.contentService.getAll();
  }

  @Get(':category/:id')
  async getOne(
    @Param() getOneRequestDto: GetOneRequestDto,
  ): Promise<Content | null> {
    console.log('jj');
    return await this.contentService.getOne(getOneRequestDto);
  }
}
