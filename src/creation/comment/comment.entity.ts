import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Content } from '../entities/content.entity';
import { Reply } from './reply.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.contents)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Content, (content) => content.comment)
  content: Content;

  @Column()
  contentId: string;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];

  constructor(params: { comment: string; userId: string; contentId: string }) {
    if (params) {
      this.comment = params.comment;
      this.userId = params.userId;
      this.contentId = params.contentId;
    }
  }
}
