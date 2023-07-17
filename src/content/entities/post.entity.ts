import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Post {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Content, (content) => content.post)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  content: Content;
}
