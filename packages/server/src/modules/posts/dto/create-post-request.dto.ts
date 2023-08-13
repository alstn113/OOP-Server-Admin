import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { PostEntity } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';

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

  toPostEntity(userEntity: UserEntity) {
    return new PostEntity(
      null,
      this.title,
      this.content,
      userEntity,
      userEntity.id,
      null,
      null,
      null,
    );
  }
}
