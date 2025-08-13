import express from 'express';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { RevenuesController } from '../controllers/revenues-controller';
import { authenticate } from '../middlewares/auth';

const router = express.Router();
router.use(authenticate);

const validators = [
  body('value').isNumeric().withMessage('Valor deve ser numérico'),
  body('data').isDate().withMessage('Data inválida'),
  body('description').isString().withMessage('Descrição inválida'),
  body('category').isString().withMessage('Categoria inválida'),
  body('paymentMethod').isString().withMessage('Método de pagamento inválido'),
  body('recurrence').isBoolean().withMessage('Recorrência deve ser booleano'),
];

router.post('/add', validators, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  await RevenuesController.addRevenue(req, res);
});

router.get('/', (req, res) => RevenuesController.getRevenues(req, res));
router.get('/:id', (req, res) => RevenuesController.getRevenueById(req, res));
router.put('/:id', validators, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  await RevenuesController.updateRevenue(req, res);
});
router.delete('/:id', (req, res) => RevenuesController.deleteRevenue(req, res));

export default router;
