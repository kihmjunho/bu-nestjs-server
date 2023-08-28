import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCreationService } from './post.service';
import { CreatePostRequestDto } from '../dto/createPost.request.dto';

@Controller('creations/posts')
export class PostCreationController {
  constructor(private readonly postCreationService: PostCreationService) {}

  @Post()
  async createPost(@Body() createPostRequestDto: CreatePostRequestDto) {
    return await this.postCreationService.create(createPostRequestDto);
  }

  @Get()
  async findAll() {
    return await this.postCreationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.postCreationService.findOne(id);
  }
}
