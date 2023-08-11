import { Post } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Exclude()
export class PostEntity implements Post {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _content: string;
  private readonly _user: UserEntity;
  private readonly _userId: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _comments: Comment[];

  constructor(
    id: number,
    title: string,
    content: string,
    user: UserEntity,
    userId: number,
    createdAt: Date,
    updatedAt: Date,
    comments: Comment[],
  ) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._user = user;
    this._userId = userId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._comments = comments;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get title(): string {
    return this._title;
  }

  @Expose()
  get content(): string {
    return this._content;
  }

  @Expose()
  get user(): UserEntity {
    return this._user;
  }

  @Expose()
  get userId(): number {
    return this._userId;
  }

  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }

  @Expose()
  get updatedAt(): Date {
    return this._updatedAt;
  }

  @Expose()
  get comments(): Comment[] {
    return this._comments;
  }
}
