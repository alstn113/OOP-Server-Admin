import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
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
}
