import express from 'express'
const expressValidator = require('express-validator')
import { Request, Response } from 'express'
import { authenticate } from '../middlewares/auth';
import { ExpensesController } from '../controllers/expenses-controller'
const { body, validationResult } = expressValidator
const router = express.Router()

router.use(authenticate);

router.post("/add", [
    body("value").isNumeric().withMessage("Valor deve ser numérico"),
    body("data").isDate().withMessage("Data deve ser uma data válida"),
    body("description").isString().withMessage("Descrição deve ser uma string"),
    body("category").isString().withMessage("Categoria deve ser uma string"),
    body("paymentMethod").isString().withMessage("Método de pagamento deve ser uma string"),
    body("recurrence").isBoolean().withMessage("Recorrência deve ser um booleano"),
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    await ExpensesController.addExpense(req, res)
})

router.get("/", async (req: Request, res: Response) => {
    await ExpensesController.getExpenses(req, res)
})

router.get("/:id", async (req: Request, res: Response) => {
    await ExpensesController.getExpenseById(req, res)
})

router.put("/:id", [
    body("value").isNumeric().withMessage("Valor deve ser numérico"),
    body("data").isDate().withMessage("Data deve ser uma data válida"),
    body("description").isString().withMessage("Descrição deve ser uma string"),
    body("category").isString().withMessage("Categoria deve ser uma string"),
    body("paymentMethod").isString().withMessage("Método de pagamento deve ser uma string"),
    body("recurrence").isBoolean().withMessage("Recorrência deve ser um booleano"),
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    await ExpensesController.updateExpense(req, res)
})

router.delete("/:id", async (req: Request, res: Response) => {
    await ExpensesController.deleteExpense(req, res)
})

export default router