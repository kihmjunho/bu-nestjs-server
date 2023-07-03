import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreatePostRequestDto } from './dto/createPost.request.dto';
import { GetOneRequestDto } from './dto/getOne.request.dto';
import { Content } from './entities/content.entity';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async create(
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<Content> {
    return await this.contentService.create(createPostRequestDto);
  }

  @Get()
  async getAllPosts(): Promise<Content[]> {
    return await this.contentService.getAll();
  }

  @Get(':category/:id')
  async getOne(
    @Param() getOneRequestDto: GetOneRequestDto,
  ): Promise<Content | null> {
    return await this.contentService.getOne(getOneRequestDto);
  }
}
