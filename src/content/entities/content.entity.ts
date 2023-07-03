import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { SubCategory } from '../../category/entities/subCategory.entity';
import { Artwork } from './artwork.entity';
import { Exhibition } from './exhibition.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToOne(() => Artwork, (artwork) => artwork.content)
  artwork: Artwork;

  @OneToOne(() => Exhibition, (exhibition) => exhibition.content)
  exhibition: Exhibition;

  @ManyToOne(() => Category, (category) => category.contents)
  category: { id: number };

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.contents)
  subCategory: { id: number };
}
