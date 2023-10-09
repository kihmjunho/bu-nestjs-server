// src/artworks/artwork.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Content } from '../entities/content.entity';

@Entity()
export class Exhibition {
  @PrimaryColumn()
  id: string;

  @Column()
  location: string;

  @Column()
  city: string;

  @Column()
  year: number;

  @Column()
  start: string;

  @Column()
  end: string;

  @Column()
  prefaceTitle: string;

  @Column()
  prefaceAuthor: string;

  @Column()
  prefaceDescription: string;

  @Column()
  etc: string;

  @OneToOne(() => Content, (content) => content.exhibition, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  content: Content;

  constructor(params: {
    location: string;
    city: string;
    year: number;
    start: string;
    end: string;
    prefaceTitle: string;
    prefaceAuthor: string;
    prefaceDescription: string;
    etc: string;
    content: Content;
  }) {
    if (params) {
      this.location = params.location;
      this.city = params.city;
      this.year = params.year;
      this.start = params.start;
      this.end = params.end;
      this.prefaceTitle = params.prefaceTitle;
      this.prefaceAuthor = params.prefaceAuthor;
      this.prefaceDescription = params.prefaceDescription;
      this.etc = params.etc;
      this.content = params.content;
      // this.materials = params.materials;
      // this.year = params.year;
      // this.price = params.price;
      // this.collector = params.collector;
    }
  }
}
