import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Post } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreatePostRequest {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  toPost() {
    return Post.from(null, this.title, this.content);
  }
}
