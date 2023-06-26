import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubCategory } from './subCategory.entity';
import { Post } from '../../post/entities/post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subCategories: SubCategory[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
