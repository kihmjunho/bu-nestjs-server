// src/artworks/artwork.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Exhibition {
  @PrimaryColumn()
  id: string;

  @Column()
  year: number;

  @Column()
  date: number;

  @OneToOne(() => Content, (content) => content.exhibition, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  content: Content;

  constructor(params: {
    year: number;
    date: number;
    content: Content;
    // materials: string;
    // year: number;
    // price: number;
    // collector: string;
  }) {
    if (params) {
      this.year = params.year;
      this.date = params.date;
      this.content = params.content;
      // this.materials = params.materials;
      // this.year = params.year;
      // this.price = params.price;
      // this.collector = params.collector;
    }
  }
}
