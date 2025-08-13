import express, { Request, Response } from 'express';
const expressValidator = require('express-validator');
import { RequestValidationError } from '../errors/request-validation-error';
import { createUser, findUserByEmail } from '../models/user-model';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateCSRFToken } from '../middlewares/csrf';

const {body, validationResult} = expressValidator
const isProd = process.env.NODE_ENV === 'production';

interface SessionRequest extends Request {
    session?: any;
}

const router = express.Router();

router.post('/api/users/signup', [
    validateCSRFToken,
    body('email').isEmail().withMessage('Email deve ser válido.'),
    body('password').trim().isLength({ min: 12, max: 100 }).withMessage('Senha deve ter no mínimo 12 caracteres.')
],
    async (req: SessionRequest, res: Response) => {
        console.log('[Signup] rota');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        let { email, password } = req.body
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            throw new Error('Email ou senha inválidos.')
        }
        
        password = await Password.hash(password)
        const user = { email: email, passwd: password }
        const user_ = await createUser(user)
        
        const userJwt = jwt.sign({
            id: user_,
            email: email
        }, process.env.SESSION_SECRET!, { expiresIn: '15m' });

        const refreshToken = jwt.sign({
            id: user_,
            email: email
        }, process.env.SESSION_SECRET!, { expiresIn: '7d' });

        res.cookie('access', userJwt, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'lax',
            maxAge: 15 * 60 * 1000 
        });

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: isProd ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            path: '/api/users/refresh'
        });

        res.status(201).send({
            message: "Usuário criado com sucesso!"
        })
    })

export { router as signupRouter }