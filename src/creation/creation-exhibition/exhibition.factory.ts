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
  userId: string;
  images: string[];
}

@Injectable()
export class ExhibitionFactory {
  create(params: Params): Exhibition {
    const {
      images,
      title,
      description,
      userId,
      categoryId,
      subCategoryId,
      year,
      date,
    } = params;
    const creationImages: CreationImage[] = images.map(
      (image, index) => new CreationImage(image, index + 1),
    );
    console.log(creationImages);
    const content = new Content({
      title,
      description,
      categoryId,
      subCategoryId,
      userId,
      creationImages,
    });
    const exhibition = new Exhibition({ year, date, content });
    return exhibition;
  }
}
