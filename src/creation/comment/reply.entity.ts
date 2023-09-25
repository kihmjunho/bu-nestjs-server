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
import { Comment } from './comment.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reply: string;

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

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;

  @Column()
  commentId: string;

  constructor(params: {
    reply: string;
    userId: string;
    contentId: string;
    commentId: string;
  }) {
    if (params) {
      this.reply = params.reply;
      this.userId = params.userId;
      this.contentId = params.contentId;
      this.commentId = params.commentId;
    }
  }
}
