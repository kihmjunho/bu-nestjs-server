import { Comment } from './comment.entity';
import { Reply } from './reply.entity';
export class GetCommentsResponseDto {
  comments: {
    id: string;
    comment: string;
    userId: string;
    nickname: string;
    createdAt: Date;
    replies: {
      id: string;
      reply: string;
      userId: string;
      nickname: string;
      createdAt: Date;
    }[];
  }[];

  constructor(comment: Comment[]) {
    this.comments = comment.map((item: Comment) => ({
      id: item.id,
      comment: item.comment,
      userId: item.userId,
      nickname: item.user.nickname,
      createdAt: item.createdAt,
      replies: item.replies
        .map((item: Reply) => ({
          id: item.id,
          reply: item.reply,
          userId: item.userId,
          nickname: item.user.nickname,
          createdAt: item.createdAt,
        }))
        .sort((a: any, b: any) => a.createdAt - b.createdAt),
    }));
  }
}
