import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostEntity {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _content: string;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
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
}
