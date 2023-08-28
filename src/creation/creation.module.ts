import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Artwork } from './entities/artwork.entity';
import { Category } from '../category/entities/category.entity';
import { SubCategory } from '../category/entities/subCategory.entity';
import { Exhibition } from './entities/exhibition.entity';
import { Post } from './entities/post.entity';
import { ArtworkCreationService } from './creation-artwork/artwork.service';
import { ArtworkCreationController } from './creation-artwork/artwork.controller';
import { TypeormArtworkRepository } from './creation-artwork/typeorm.repository';
import {
  ARTWORK_REPOSITORY,
  EXHIBITION_REPOSITORY,
} from '../common/constants/token.constant';
import { ExhibitionCreationService } from './creation-exhibition/exhibition.service';
import { ExhibitionCreationController } from './creation-exhibition/exhibition.controller';
import { TypeormExhibitionRepository } from './creation-exhibition/typeorm.repository';
import { CreationController } from './creation.controller';
import { CreationService } from './creation.service';
import { CreationRepository } from './creation.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      Artwork,
      Exhibition,
      Category,
      SubCategory,
      Post,
    ]),
  ],
  controllers: [
    CreationController,
    ArtworkCreationController,
    ExhibitionCreationController,
  ],
  providers: [
    CreationService,
    CreationRepository,
    ArtworkCreationService,
    ExhibitionCreationService,
    {
      provide: ARTWORK_REPOSITORY,
      useClass: TypeormArtworkRepository,
    },
    {
      provide: EXHIBITION_REPOSITORY,
      useClass: TypeormExhibitionRepository,
    },
  ],
})
export class CreationModule {}
