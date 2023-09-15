import { Post } from './post.entity';
import { extractCommonProperties } from '../common/common.helper';

export class GetPostParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  images: {
    url: string;
    seq: number;
  }[];
  metaDescription: string;

  constructor(post: Post) {
    const commonProperties = extractCommonProperties(post.content);
    this.title = commonProperties.title;
    this.description = commonProperties.description;
    this.thumbnail = commonProperties.thumbnail;
    this.images = commonProperties.images;
    this.metaDescription = post.metaDescription;
  }
}
