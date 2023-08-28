import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostRepository } from './post.repository';
import { Post } from '../entities/post.entity';

@Injectable()
export class TypeormPostRepository implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async save(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['content'],
    });
  }

  async findOneById(id: string): Promise<Post | null> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['content'],
    });
  }
}
