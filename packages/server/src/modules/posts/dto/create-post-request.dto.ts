import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreatePostRequestDto {
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

  toPostEntity() {
    return new PostEntity(
      null,
      this.title,
      this.content,
      null,
      null,
      null,
      null,
      null,
    );
  }
}
