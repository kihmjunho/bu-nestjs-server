import { Comment } from './comment.entity';

export class GetCommentsResponseDto {
  comments: {
    id: string;
    comment: string;
    user: {
      id: string;
      nickname: string;
    };
    createdAt: Date;
    children: {
      id: string;
      comment: string;
      user: {
        id: string;
        nickname: string;
      };
    }[];
  }[];

  constructor(comment: Comment[]) {
    this.comments = comment.map((item: Comment) => ({
      id: item.id,
      comment: item.comment,
      user: {
        id: item.userId,
        nickname: item.user.nickname,
      },
      createdAt: item.createdAt,
      children: item.children.map((comment) => {
        return {
          ...comment,
          user: {
            id: comment.userId,
            nickname: comment.user.nickname,
          },
        };
      }),
    }));
  }
}
