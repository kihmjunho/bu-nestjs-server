import { Post } from './post.entity';

export interface PostRepository {
  save(post: Post): Promise<Post>;

  findAll(): Promise<Post[]>;

  findOneById(id: string): Promise<Post | null>;
}
