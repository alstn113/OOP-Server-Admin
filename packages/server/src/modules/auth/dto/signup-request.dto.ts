import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class SignupRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  toUserEntity(hashedPassword: string) {
    return new UserEntity(
      null,
      this.username,
      hashedPassword,
      null,
      null,
      null,
    );
  }
}
