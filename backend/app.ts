import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import expensesRoutes from './routes/expenses'
import revenueRoutes from './routes/revenue';

const app = express()
app.use(express.json())

app.use(cookieParser());
app.use(helmet());

//POLÍTICA CSP
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
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
  })
);
app.use(cors({
    origin: [
    'https://localhost:5173',
    'https://localhost:4000'
],
    credentials: true
}))

app.use('/api/expenses', expensesRoutes)
app.use('/api/revenues', revenueRoutes);

export default app