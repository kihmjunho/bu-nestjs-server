import { Injectable } from '@nestjs/common';
import { CreationImage } from '../entities/creationImage.entity';
import { Content } from '../entities/content.entity';
import { Exhibition } from './exhibition.entity';

interface Params {
  title: string;
  description: string;
  thumbnailId: string;
  categoryId: number;
  subCategoryId: number;
  location: string;
  city: string;
  year: number;
  start: string;
  end: string;
  prefaceTitle: string;
  prefaceAuthor: string;
  prefaceDescription: string;
  etc: string;
  images: string[];
  userId: string;
}

@Injectable()
export class ExhibitionFactory {
  create(params: Params): Exhibition {
    const {
      images,
      title,
      description,
      categoryId,
      subCategoryId,
      location,
      city,
      year,
      start,
      end,
      prefaceTitle,
      prefaceAuthor,
      prefaceDescription,
      etc,
      userId,
    } = params;

    const creationImages: CreationImage[] = images.map(
      (image, index) => new CreationImage(image, index + 1),
    );

    const content = new Content({
      title,
      description,
      categoryId,
      subCategoryId,
      userId,
      creationImages,
    });

    return new Exhibition({
      location,
      city,
      year,
      start,
      end,
      prefaceTitle,
      prefaceAuthor,
      prefaceDescription,
      etc,
      content,
    });
  }
}
