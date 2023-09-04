import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from '../../category/entities/subCategory.entity';
import { Content } from './content.entity';

@Entity()
export class CreationImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seq: number;

  @Column()
  url: string;

  @ManyToOne(() => Content, (content) => content.creationImages)
  content: Content;

  constructor(url: string, seq: number) {
    this.url = url;
    this.seq = seq;
  }
}
