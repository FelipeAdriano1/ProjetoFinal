import express, {Request, Response} from 'express';
import { generateCSRFToken } from '../middlewares/csrf';

interface CSRFRequest extends Request {
    csrfToken?: string;
}

const router = express.Router();

router.get('/api/users/csrf', generateCSRFToken, (req: CSRFRequest, res: Response) => {
    console.log('[CSRF] Token gerado');
    
    res.status(200).send({
        message: 'Token CSRF gerado com sucesso!',
        csrfToken: req.csrfToken
    });
});

export { router as csrfRouter }; 