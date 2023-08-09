import { Exclude, Expose } from 'class-transformer';

export class Post {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _title: string;
  @Exclude() private readonly _content: string;
  @Exclude() private readonly _published: boolean;
  @Exclude() private readonly _authorId: number;

  constructor(
    id: number,
    title: string,
    content: string,
    published: boolean,
    authorId: number,
  ) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._published = published;
    this._authorId = authorId;
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
  get published(): boolean {
    return this._published;
  }

  @Expose()
  get authorId(): number {
    return this._authorId;
  }
}
