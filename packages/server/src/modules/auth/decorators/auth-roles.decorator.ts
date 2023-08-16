import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const AuthRoles = (...roles: User['role'][]) =>
  applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
