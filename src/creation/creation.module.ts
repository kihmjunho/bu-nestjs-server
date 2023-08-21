import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { CreationController } from './creation.controller';
import { CreationService } from './creation.service';
import { Artwork } from './entities/artwork.entity';
import { Category } from '../category/entities/category.entity';
import { SubCategory } from '../category/entities/subCategory.entity';
import { Exhibition } from './entities/exhibition.entity';
import { Post } from './entities/post.entity';
import { ArtworkCreationService } from './artwork-creation.service';
import { ArtworkCreationController } from './artwork-creation.controller';

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
  controllers: [CreationController, ArtworkCreationController],
  providers: [CreationService, ArtworkCreationService],
})
export class CreationModule {}
