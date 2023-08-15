import { User } from '@prisma/client';

export declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        username: string;
        role: User['role'];
      };
    }
  }
}
