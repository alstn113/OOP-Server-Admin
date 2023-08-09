import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from '../post.entity';

@Exclude()
export class CreatePostRequestDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  content: string;

  toPostEntity() {
    return PostEntity.from(null, this.title, this.content);
  }
}
