import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostRequestDto } from './dto/createPost.request.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostRequestDto: CreatePostRequestDto) {
    const { title, categoryId, subCategoryId } = createPostRequestDto;
    const post = new Post();
    post.title = title;
    post.category = { id: categoryId };
    post.subCategory = { id: subCategoryId };

    return this.postRepository.save(post);
  }

  async getAllPosts() {
    const posts = await this.postRepository.find({
      relations: ['subCategory', 'category'],
    });

    return posts;
  }
}
