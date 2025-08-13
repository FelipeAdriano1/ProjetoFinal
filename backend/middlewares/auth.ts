import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//EXTENDE A CLASSE REQUEST PARA INCLUIR A PROPRIEDADE USERID
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = ( req: AuthenticatedRequest, res: Response, next: NextFunction ) => {
  
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    console.error('[AuthMiddleware] SESSION_SECRET não definido.');
    return res.status(500).send({ message: 'Erro de configuração.' });
  }

  // Primeiro tenta cookie "access"
  let token: string | undefined = req.cookies?.access;

  // Se não houver cookie, tenta header Authorization: Bearer <token>
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).send({ message: 'Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    req.userId = payload.id as string;
    next();
  } catch (err) {
    console.log('[AuthMiddleware] Token inválido:', err);
    return res.status(401).send({ message: 'Token inválido.' });
  }
};
