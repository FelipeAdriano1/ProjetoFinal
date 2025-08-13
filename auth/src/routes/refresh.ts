import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateCSRFToken } from '../middlewares/csrf';

const isProd = process.env.NODE_ENV === 'development';
interface RefreshRequest extends Request {
    cookies: {
        refresh?: string;
    };
}

const router = express.Router();

//ROTA PARA RENOVAR OS TOKENS DE ACESSO E REFRESH
router.post('/api/users/refresh', validateCSRFToken, async (req: RefreshRequest, res: Response) => {
    console.log('[Refresh] rota');
    
    const refreshToken = req.cookies.refresh;
    
    if (!refreshToken) {
        return res.status(401).send({ message: 'Refresh token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.SESSION_SECRET!) as any;
        
        const newAccessToken = jwt.sign({
            id: decoded.id,
            email: decoded.email
        }, process.env.SESSION_SECRET!, { expiresIn: '15m' });

        const newRefreshToken = jwt.sign({
            id: decoded.id,
            email: decoded.email
        }, process.env.SESSION_SECRET!, { expiresIn: '7d' });

        res.cookie('access', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refresh', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/api/users/refresh'
        });

        res.status(200).send({
            message: 'Tokens renovados com sucesso!'
        });

    } catch (error) {
        console.log('[Refresh] Token inválido:', error);
        res.status(401).send({ message: 'Refresh token inválido.' });
    }
});

export { router as refreshRouter }; 