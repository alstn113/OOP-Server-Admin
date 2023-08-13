import { Response } from 'express';

// httpOnly: 브라우저에서 접근 금지
// secure: https에서만 쿠키 전송
// domain: 쿠키를 전송할 도메인

const COOKIE_NAME = 'access_token';

const setTokenCookie = (res: Response, token: string) => {
  const maxAge = 1000 * 60 * 60 * 24 * 1; // 1d
  const domain =
    process.env.NODE_ENV === 'production' ? 'yourdomain.com' : undefined;

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
    domain,
  });
};

const clearTokenCookie = (res: Response) => {
  const domain =
    process.env.NODE_ENV === 'production' ? 'yourdomain.com' : undefined;

  res.clearCookie(COOKIE_NAME, {
    path: '/',
    domain,
  });
};

export { setTokenCookie, clearTokenCookie };
