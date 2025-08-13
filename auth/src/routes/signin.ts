import express, { Request, Response } from 'express';
const expressValidator = require('express-validator');
import { RequestValidationError } from '../errors/request-validation-error';
import { Password } from '../services/password';
import { findUserByEmail } from '../models/user-model';
import jwt from 'jsonwebtoken'
import { validateCSRFToken } from '../middlewares/csrf';
const router = express.Router();

const { body, validationResult } = expressValidator
const isProd = process.env.NODE_ENV === 'production';

interface SessionRequest extends Request {
    session?: any;
}

router.post('/api/users/signin', [
    validateCSRFToken,
    body('email').isEmail().withMessage('Email deve ser válido.'),
    body('password').trim().isLength({ min: 12, max: 100 }).withMessage('Senha deve ter no mínimo 12 caracteres.')
],

    async (req: SessionRequest, res: Response): Promise<void> => {
        console.log('[Signin] rota');

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        const getUser = await findUserByEmail(email);

        if (!getUser) {
            res.status(400).send({ message: 'Email ou senha inválidos.' });
            return;
        }
        const validateSession = await Password.compare(getUser.passwd, password);

        if (!validateSession) {
            res.status(400).send({ message: 'Email ou senha inválidos.' });
            return;
        }
        const userJwt = jwt.sign({
            id: getUser._id,
            email: email
        }, process.env.SESSION_SECRET!, { expiresIn: '15m' });

        const refreshToken = jwt.sign({
            id: getUser._id,
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
        });

        res.status(200).send({
            message: "Você está autenticado!"
        })
    })

export { router as signinRouter }