import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    currentUser?: any;
    cookies: {
        access?: string;
    };
}

export const currentUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log('[Current user middleware]');
    
    const accessToken = req.cookies.access;
    
    if (!accessToken) {
        console.log('[Current user] Nenhum access token encontrado');
        return next();
    }

    try {
        const payload = jwt.verify(accessToken, process.env.SESSION_SECRET!) as any;
        req.currentUser = payload;
        console.log('[Current user] Usuário autenticado.');
    } catch (error) {
        console.log('[Current user] Token inválido:', error);
    }

    next();
};

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        return res.status(401).send({ message: 'Não autorizado.' });
    }
    next();
}; 