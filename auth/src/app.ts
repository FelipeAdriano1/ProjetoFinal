//IMPORTAÇÃO DO CORS
import cors from 'cors'
//EXPRESS
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
//ROTAS
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { refreshRouter } from './routes/refresh';
import { csrfRouter } from './routes/csrf';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    baseUri: ["'self'"],
    objectSrc: ["'none'"],
    frameAncestors: ["'none'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'"],
    connectSrc: ["'self'", 'https://localhost:4000', 'https://localhost:3001', 'wss://localhost:5173'],
    workerSrc: ['blob:'],
  },
};
app.use(helmet.contentSecurityPolicy(cspConfig));
app.use(cors({
    origin: 'https://localhost:5173',
    credentials: true
}))

//ROTAS
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(refreshRouter);
app.use(csrfRouter);

export { app }