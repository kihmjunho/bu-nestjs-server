import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { SubCategory } from '../../category/entities/subCategory.entity';
import { Artwork } from './artwork.entity';
import { Exhibition } from './exhibition.entity';
import { Post } from './post.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
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

  @Column()
  subCategoryId: number;

  constructor(params: {
    title: string;
    description: string;
    categoryId: number;
    subCategoryId: number;
  }) {
    if (params) {
      this.title = params.title;
      this.description = params.description;
      this.categoryId = params.categoryId;
      this.subCategoryId = params.subCategoryId;
    }
  }
}
