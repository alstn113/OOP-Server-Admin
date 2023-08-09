import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from '../post.entity';

@Exclude()
export class CreatePostRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  toPostEntity() {
    return new PostEntity({
      title: this.title,
      content: this.content,
    });
  }
}
