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
export class Guestbook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.guestbook)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Guestbook, (guestbook) => guestbook.children)
  parent: Guestbook;

  @OneToMany(() => Guestbook, (guestbook) => guestbook.parent)
  children: Guestbook[];

  @Column({ nullable: true })
  parentId?: string;

  constructor(params: { message: string; userId: string; parentId?: string }) {
    if (params) {
      this.message = params.message;
      this.userId = params.userId;
      this.parentId = params.parentId;
    }
  }
}
