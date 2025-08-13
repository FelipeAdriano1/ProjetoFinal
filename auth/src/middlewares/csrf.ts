import { Request, Response, NextFunction } from 'express';
import CSRFTokens from '../../classes/csrf-tokens';

interface CSRFRequest extends Request {
    csrfToken?: string;
    cookies: {
        csrf?: string;
    };
}

const secret = process.env.CSRF_SECRET!;
const csrfTokens = new CSRFTokens(secret);

export const generateCSRFToken = (req: CSRFRequest, res: Response, next: NextFunction) => {
  const token = csrfTokens.generateToken();
  res.cookie('csrf', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
  req.csrfToken = token;
  next();
};

export const validateCSRFToken = (req: CSRFRequest, res: Response, next: NextFunction) => {
  const cookieToken = req.cookies.csrf;
  const headerToken = req.headers['x-csrf-token'] as string;
  if (!cookieToken || !headerToken) return res.status(403).send({ message: 'Token CSRF não fornecido.' });
  if (cookieToken !== headerToken) return res.status(403).send({ message: 'Token CSRF inválido.' });
  if (!csrfTokens.validateToken(cookieToken)) return res.status(403).send({ message: 'Token CSRF inválido ou expirado.' });
  next();
}; 