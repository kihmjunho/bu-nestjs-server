import { Post } from './post.entity';
import { GetCommonParamsResponseDto } from '../dto-response/getCommon.params.response.dto';

export class GetPostParamResponseDto {
  title: string;
  description: string;
  thumbnail: string;
  images: {
    url: string;
    seq: number;
  }[];
  metaDescription: string;
  userId: string;

  constructor(post: Post) {
    const commonProperties = new GetCommonParamsResponseDto(post.content);

    this.title = commonProperties.title;
    this.description = commonProperties.description;
    this.thumbnail = commonProperties.thumbnail;
    this.images = commonProperties.images;
    this.metaDescription = post.metaDescription;
    this.userId = commonProperties.userId;
  }
}
