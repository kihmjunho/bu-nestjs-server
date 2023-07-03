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
  date: number;

  @OneToOne(() => Content, (content) => content.artwork)
  @JoinColumn()
  content: Content;
}
