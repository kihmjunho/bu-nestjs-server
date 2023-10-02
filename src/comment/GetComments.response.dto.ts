import { Comment } from './comment.entity';

export class GetCommentsResponseDto {
  comments: {
    id: string;
    comment: string;
    userId: string;
    nickname: string;
    createdAt: Date;
  }[];

  constructor(comment: Comment[]) {
    this.comments = comment.map((item: Comment) => ({
      id: item.id,
      comment: item.comment,
      userId: item.userId,
      nickname: item.user.nickname,
      createdAt: item.createdAt,
    }));
  }
}
