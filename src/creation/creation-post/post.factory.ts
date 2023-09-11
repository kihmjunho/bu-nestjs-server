import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { CreationImage } from '../entities/creationImage.entity';
import { Content } from '../entities/content.entity';

interface Params {
  title: string;
  description: string;
  categoryId: number;
  subCategoryId: number;
  metaDescription: string;
  images: string[];
}
@Injectable()
export class PostFactory {
  create(params: Params): Post {
    const {
      title,
      description,
      categoryId,
      subCategoryId,
      metaDescription,
      images,
    } = params;

    const creationImages: CreationImage[] = images.map(
      (image, index) => new CreationImage(image, index + 1),
    );

    const content = new Content({
      title,
      description,
      categoryId,
      subCategoryId,
      creationImages,
    });

    return new Post({ metaDescription, content });
  }
}
