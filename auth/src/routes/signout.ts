import express, { Request, Response } from 'express';
import { validateCSRFToken } from '../middlewares/csrf';

const isProd = process.env.NODE_ENV === 'production';
const router = express.Router();

interface SessionRequest extends Request {
    session?: any;
}

router.post('/api/users/signout', validateCSRFToken, (req: SessionRequest, res: Response) => {
    console.log('[Signout] rota');
    
    res.clearCookie('access', {
        httpOnly: true,
        secure: true,
        sameSite: isProd ? 'strict' : 'lax',
    });
    res.clearCookie('refresh', {
        httpOnly: true,
        secure: true,
        sameSite: isProd ? 'strict' : 'lax',
        path: '/api/users/refresh'
    });
    
    res.status(200).send({
        message: 'Usuário deslogado com sucesso!'
    });
});

export { router as signoutRouter };