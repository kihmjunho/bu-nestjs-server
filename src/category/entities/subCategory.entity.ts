import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('sub_categories')
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Post, (post) => post.subCategory)
  posts: Post[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;
}
