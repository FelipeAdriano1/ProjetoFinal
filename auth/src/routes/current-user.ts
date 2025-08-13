import express from 'express';
import { currentUser, requireAuth } from '../middlewares/auth';

interface AuthRequest extends express.Request {
    currentUser?: any;
}

const router = express.Router();

//ROTA PARA OBTER O USUÁRIO ATUAL
router.get('/api/users/currentuser', currentUser, requireAuth, (req: AuthRequest, res) => {
    console.log('[Current user route]', req.currentUser);

    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };