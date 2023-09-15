import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCreationService } from './post.service';
import { CreatePostRequestDto } from './createPost.request.dto';

@Controller('creations/posts')
export class PostCreationController {
  constructor(private readonly postCreationService: PostCreationService) {}

  @Post()
  async createPost(@Body() createPostRequestDto: CreatePostRequestDto) {
    console.log('hh');
    return await this.postCreationService.create(createPostRequestDto);
  }

  @Get()
  async findAll() {
    return await this.postCreationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    console.log('post');
    return await this.postCreationService.findOne(id);
  }
}
