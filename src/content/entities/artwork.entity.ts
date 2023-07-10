// src/artworks/artwork.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { UserRole } from '../../user/userRole';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  materials: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column()
  collector: string;

  @OneToOne(() => Content, (content) => content.artwork)
  @JoinColumn()
  content: Content;

  constructor(params: {
    height: number;
    width: number;
    // materials: string;
    // year: number;
    price: number;
    // collector: string;
  }) {
    if (params) {
      this.height = params.height;
      this.width = params.width;
      // this.materials = params.materials;
      // this.year = params.year;
      this.price = params.price;
      // this.collector = params.collector;
    }
  }
}
