import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { SubCategory } from '../../category/entities/subCategory.entity';
import { Artwork } from '../creation-artwork/artwork.entity';
import { Exhibition } from '../creation-exhibition/exhibition.entity';
import { Post } from '../creation-post/post.entity';
import { CreationImage } from './creationImage.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ length: 10000 })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToOne(() => Artwork, (artwork) => artwork.content)
  artwork: Artwork;

  @OneToOne(() => Exhibition, (exhibition) => exhibition.content)
  exhibition: Exhibition;

  @OneToOne(() => Post, (post) => post.content)
  post: Post;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  @Column()
  categoryId: number;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.contents)
  subCategory: SubCategory;

  @OneToMany(() => CreationImage, (creationImage) => creationImage.content, {
    cascade: ['insert'],
  })
  creationImages: CreationImage[];

  @Column()
  subCategoryId: number;

  @ManyToOne(() => User, (user) => user.contents)
  user: User;

  @Column()
  userId: string;

  constructor(params: {
    title: string;
    description: string;
    categoryId: number;
    subCategoryId: number;
    userId: string;
    creationImages: CreationImage[];
  }) {
    if (params) {
      this.title = params.title;
      this.description = params.description;
      this.categoryId = params.categoryId;
      this.subCategoryId = params.subCategoryId;
      this.userId = params.userId;
      this.creationImages = params.creationImages;
    }
  }
}
