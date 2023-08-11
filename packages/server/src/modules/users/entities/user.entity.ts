import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Exclude()
export class UserEntity implements User {
  private readonly _id: number;
  private readonly _username: string;
  private readonly _password: string;
  private readonly _role: Role;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(
    id: number,
    username: string,
    password: string,
    role: Role,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._role = role;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get username(): string {
    return this._username;
  }

  @Expose()
  get password(): string {
    return this._password;
  }

  @Expose()
  get role(): Role {
    return this._role;
  }

  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }

  @Expose()
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
