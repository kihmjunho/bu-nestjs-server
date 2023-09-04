import { Inject, Injectable } from '@nestjs/common';
import { Content } from '../entities/content.entity';
import { POST_REPOSITORY } from '../../common/constants/token.constant';
import { PostRepository } from './post.repository';
import { CreatePostRequestDto } from '../dto-create/createPost.request.dto';
import { Post } from '../entities/post.entity';
import { CommonRepository } from '../common/common.repository';
import { CreateContentResponseDto } from '../dto-response/createContent.response.dto';
import { GetPostParamResponseDto } from '../dto-response/getPost.param.response.dto';

@Injectable()
export class PostCreationService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
    private readonly commonRepository: CommonRepository,
  ) {}

  async create(createPostRequestDto: CreatePostRequestDto) {
    const {
      title,
      description,
      thumbnailId,
      categoryId,
      subCategoryId,
      metaDescription,
    } = createPostRequestDto;
    const content = new Content({
      title,
      description,
      thumbnailId,
      categoryId,
      subCategoryId,
    });

    const post = new Post({ metaDescription, content });
    const data = await this.postRepository.save(post);

    const name = await this.commonRepository.findCategoryNameById(
      subCategoryId,
    );

    const url = `/post/${name}/${data.id}`;

    return new CreateContentResponseDto(url);
  }

  async findAll() {
    return await this.postRepository.findAll();
  }

  async findOne(id: string) {
    const response = await this.postRepository.findOneById(id);

    if (response) {
      return new GetPostParamResponseDto(response);
    }
  }
}
