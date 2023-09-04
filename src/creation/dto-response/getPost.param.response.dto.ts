import { Post } from '../entities/post.entity';

export class GetPostParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;

  constructor(post: Post) {
    this.title = post.content.title;
    this.description = post.content.description;
    this.thumbnail = post.content.thumbnail;
  }
}
