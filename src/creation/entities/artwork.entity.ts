// src/artworks/artwork.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Artwork {
  @PrimaryColumn()
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

  @OneToOne(() => Content, (content) => content.artwork, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  content: Content;

  constructor(params: {
    height: number;
    width: number;
    content: Content;
    materials: string;
    year: number;
    price: number;
    collector: string;
  }) {
    if (params) {
      this.height = params.height;
      this.width = params.width;
      this.content = params.content;
      this.materials = params.materials;
      this.year = params.year;
      this.price = params.price;
      this.collector = params.collector;
    }
  }
}
