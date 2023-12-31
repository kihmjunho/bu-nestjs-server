import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Content } from '../creation/entities/content.entity';
import { User } from '../user/entities/user.entity';

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

  @ManyToOne(() => Comment, (comment) => comment.children)
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @Column({ nullable: true })
  parentId?: string;

  constructor(params: {
    comment: string;
    userId: string;
    contentId: string;
    parentId?: string;
  }) {
    if (params) {
      this.comment = params.comment;
      this.userId = params.userId;
      this.contentId = params.contentId;
      this.parentId = params.parentId;
    }
  }
}
