import { Request, Response } from 'express'
import { addExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } from '../models/expenses'

export class ExpensesController {
    // Adicionar despesa
    static async addExpense(req: Request, res: Response) {
        try {
            const { value, data, description, category, paymentMethod, recurrence } = req.body
            
            const expense = { 
                value, 
                data, 
                description, 
                category, 
                paymentMethod, 
                recurrence 
            }

            const result = await addExpense(expense)
            
            res.status(201).json({ 
                message: "Despesa adicionada com sucesso",
                id: result 
            })
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    // Listar despesas
    static async getExpenses(req: Request, res: Response) {
        try {
            const expenses = await getExpenses()
            
            res.status(200).json({ 
                expenses,
                total: expenses.length 
            })
        } catch (error) {
            console.error('Erro ao buscar despesas:', error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    // Buscar uma despesa específica
    static async getExpenseById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const expense = await getExpenseById(id)
            
            if (!expense) {
                return res.status(404).json({ message: "Despesa não encontrada" })
            }
            
            res.status(200).json({ expense })
        } catch (error) {
            console.error('Erro ao buscar despesa:', error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    // Editar uma despesa
    static async updateExpense(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { value, data, description, category, paymentMethod, recurrence } = req.body
            
            const expense = { 
                value, 
                data, 
                description, 
                category, 
                paymentMethod, 
                recurrence 
            }

            const result = await updateExpense(id, expense)
            
            if (!result) {
                return res.status(404).json({ message: "Despesa não encontrada" })
            }
            
            res.status(200).json({ 
                message: "Despesa atualizada com sucesso",
                id: id
            })
        } catch (error) {
            console.error('Erro ao atualizar despesa:', error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

    // Excluir uma despesa
    static async deleteExpense(req: Request, res: Response) {
        try {
            
            const { id } = req.params
            const result = await deleteExpense(id)
            
            if (!result) {
                return res.status(404).json({ message: "Despesa não encontrada" })
            }
            
            res.status(200).json({ 
                message: "Despesa excluída com sucesso",
                id: id
            })
        } catch (error) {
            console.error('Erro ao excluir despesa:', error)
            res.status(500).json({ message: "Erro interno do servidor" })
        }
    }
} 