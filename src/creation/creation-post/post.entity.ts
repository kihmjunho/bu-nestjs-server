import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Content } from '../entities/content.entity';

@Entity()
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  metaDescription: string;

  @OneToOne(() => Content, (content) => content.post, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  content: Content;

  constructor(params: { metaDescription: string; content: Content }) {
    if (params) {
      this.metaDescription = params.metaDescription;
      this.content = params.content;
    }
  }
}
