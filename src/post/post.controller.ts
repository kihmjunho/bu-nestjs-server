import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequestDto } from './dto/createPost.request.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostRequestDto: CreatePostRequestDto) {
    return await this.postService.create(createPostRequestDto);
  }

  @Get()
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }
}
