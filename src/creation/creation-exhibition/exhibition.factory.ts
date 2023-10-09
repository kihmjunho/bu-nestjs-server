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
  year: number;
  date: string;
  images: string[];
}

@Injectable()
export class ExhibitionFactory {
  create(params: Params, userId: string): Exhibition {
    const {
      images,
      title,
      description,
      categoryId,
      subCategoryId,
      year,
      date,
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
    return new Exhibition({ year, date, content });
  }
}
