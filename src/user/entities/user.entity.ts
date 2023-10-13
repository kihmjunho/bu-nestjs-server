import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../userRole';
import * as bcrypt from 'bcrypt';
import { Content } from '../../creation/entities/content.entity';
import { Comment } from '../../comment/comment.entity';
import { Guestbook } from '../../guestbook/guestbook.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const saltRepeatCount = 10;
    const salt = await bcrypt.genSalt(saltRepeatCount);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @Column()
  nickname: string;

  @Column()
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Guestbook, (guestbook) => guestbook.user)
  guestbook: Guestbook[];

  constructor(params: {
    email: string;
    password: string;
    role: UserRole;
    nickname: string;
  }) {
    if (params) {
      this.email = params.email;
      this.password = params.password;
      this.role = params.role;
      this.nickname = params.nickname;
    }
  }
}
