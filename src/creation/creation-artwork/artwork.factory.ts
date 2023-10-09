import { Injectable } from '@nestjs/common';
import { Artwork } from './artwork.entity';
import { CreationImage } from '../entities/creationImage.entity';
import { Content } from '../entities/content.entity';

interface Params {
  title: string;
  description: string;
  thumbnailId: string;
  categoryId: number;
  subCategoryId: number;
  width: number;
  height: number;
  materials: string;
  collector: string;
  price: number;
  year: number;
  images: string[];
  userId: string;
}

@Injectable()
export class ArtworkFactory {
  create(params: Params): Artwork {
    const {
      images,
      title,
      description,
      categoryId,
      subCategoryId,
      year,
      width,
      height,
      collector,
      price,
      materials,
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
      creationImages,
      userId,
    });

    return new Artwork({
      height,
      width,
      materials,
      price,
      collector,
      year,
      content,
    });
  }
}
