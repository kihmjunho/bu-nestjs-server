// src/subcategories/subcategory.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Content } from '../../content/entities/content.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Content, (content) => content.subCategory)
  contents: Content[];
}
