// src/artworks/artwork.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Exhibition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column()
  date: number;

  @OneToOne(() => Content, (content) => content.artwork)
  @JoinColumn()
  content: Content;

  constructor(params: {
    year: number;
    date: number;
    // materials: string;
    // year: number;
    // price: number;
    // collector: string;
  }) {
    if (params) {
      this.year = params.year;
      this.date = params.date;
      // this.materials = params.materials;
      // this.year = params.year;
      // this.price = params.price;
      // this.collector = params.collector;
    }
  }
}
