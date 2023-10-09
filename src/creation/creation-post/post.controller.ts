import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostCreationService } from './post.service';
import { CreatePostRequestDto } from './createPost.request.dto';
import { JwtAuthGuard } from '../../config/jwt/jwtAuth.guard';

@Controller('creations/posts')
export class PostCreationController {
  constructor(private readonly postCreationService: PostCreationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Request() req: any,
    @Body() createPostRequestDto: CreatePostRequestDto,
  ) {
    const { id } = req.user;
    return await this.postCreationService.create(createPostRequestDto, id);
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
