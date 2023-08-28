import { Inject, Injectable } from '@nestjs/common';
import { Content } from '../entities/content.entity';
import { POST_REPOSITORY } from '../../common/constants/token.constant';
import { PostRepository } from './post.repository';
import { CreatePostRequestDto } from '../dto/createPost.request.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostCreationService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository, // @InjectRepository(Exhibition) // private readonly exhibitionRepository2: Repository<Exhibition>,
  ) {}

  async create(createPostRequestDto: CreatePostRequestDto) {
    const { title, description, categoryId, subCategoryId, metaDescription } =
      createPostRequestDto;
    const content = new Content({
      title,
      description,
      categoryId,
      subCategoryId,
    });

    const post = new Post({ metaDescription, content });
    await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.findAll();
  }

  async findOne(id: string) {
    return await this.postRepository.findOneById(id);
  }
}
