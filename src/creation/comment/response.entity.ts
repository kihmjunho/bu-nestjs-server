// comment.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Response, (response) => response.parent)
  parent: Response;

  @OneToMany(() => Response, (response) => response.parent)
  replies: Response[];
}
