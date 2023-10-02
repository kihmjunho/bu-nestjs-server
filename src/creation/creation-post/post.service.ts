import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from '../../common/constants/token.constant';
import { PostRepository } from './post.repository';
import { CreatePostRequestDto } from './createPost.request.dto';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { GetPostParamResponseDto } from './getPost.param.response.dto';
import { PostFactory } from './post.factory';
import { CreationImage } from '../entities/creationImage.entity';

@Injectable()
export class PostCreationService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
  ) {}

  async create(createPostRequestDto: CreatePostRequestDto) {
    const post = this.postFactory.create(createPostRequestDto);
    const data = await this.postRepository.save(post);

    return new CreateContentResponseDto(data.id);
  }

  async findAll() {
    return await this.postRepository.findAll();
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOneById(id);
    if (!post) {
      throw new Error();
    }
    let thumbnail;
    const images: CreationImage[] = [];
    for (const item of post.content.creationImages) {
      if (item.seq === 1) {
        thumbnail = item.url;
      } else {
        images.push(item);
      }
    }

    const response = {
      ...post,
      content: {
        ...post.content,
        thumbnail,
        images,
      },
    };

    if (response) {
      return new GetPostParamResponseDto(response);
    }
  }
}
