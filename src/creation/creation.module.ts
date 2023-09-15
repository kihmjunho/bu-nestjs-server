import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Artwork } from './creation-artwork/artwork.entity';
import { Category } from '../category/entities/category.entity';
import { SubCategory } from '../category/entities/subCategory.entity';
import { Exhibition } from './creation-exhibition/exhibition.entity';
import { Post } from './creation-post/post.entity';
import { ArtworkCreationService } from './creation-artwork/artwork.service';
import { ArtworkCreationController } from './creation-artwork/artwork.controller';
import { TypeormArtworkRepository } from './creation-artwork/typeorm-artwork.repository';
import {
  ARTWORK_REPOSITORY,
  EXHIBITION_REPOSITORY,
  POST_REPOSITORY,
} from '../common/constants/token.constant';
import { ExhibitionCreationService } from './creation-exhibition/exhibition.service';
import { ExhibitionCreationController } from './creation-exhibition/exhibition.controller';
import { TypeormExhibitionRepository } from './creation-exhibition/typeorm-exhibition.repository';
import { CreationController } from './creation.controller';
import { CreationService } from './creation.service';
import { CreationRepository } from './creation.repository';
import { PostCreationController } from './creation-post/post.controller';
import { PostCreationService } from './creation-post/post.service';
import { TypeormPostRepository } from './creation-post/typeorm-post.repository';
import { ExhibitionFactory } from './creation-exhibition/exhibition.factory';
import { ArtworkFactory } from './creation-artwork/artwork.factory';
import { PostFactory } from './creation-post/post.factory';
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
    PostCreationController,
  ],
  providers: [
    CreationService,
    CreationRepository,
    ArtworkCreationService,
    ExhibitionCreationService,
    PostCreationService,
    {
      provide: ARTWORK_REPOSITORY,
      useClass: TypeormArtworkRepository,
    },
    {
      provide: EXHIBITION_REPOSITORY,
      useClass: TypeormExhibitionRepository,
    },
    {
      provide: POST_REPOSITORY,
      useClass: TypeormPostRepository,
    },
    ArtworkFactory,
    ExhibitionFactory,
    PostFactory,
  ],
})
export class CreationModule {}
