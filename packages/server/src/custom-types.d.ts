export declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        username: string;
      };
    }
  }
}
