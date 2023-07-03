// src/artworks/artwork.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: number;

  @OneToOne(() => Content, (content) => content.artwork)
  @JoinColumn()
  content: Content;
}
