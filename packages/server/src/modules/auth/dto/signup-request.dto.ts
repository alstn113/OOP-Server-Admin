import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class SignupRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    default: Role.USER,
    enum: Object.values(Role),
  })
  @IsEnum(Role)
  role: User['role'];
}
