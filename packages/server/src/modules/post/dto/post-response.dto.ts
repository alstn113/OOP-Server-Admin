import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostResponseDto {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _content: string;

  constructor(id: number, title: string, content: string) {
    this._id = id;
    this._title = title;
    this._content = content;
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

  static from(id: number, title: string, content: string) {
    return new PostResponseDto(id, title, content);
  }
}
