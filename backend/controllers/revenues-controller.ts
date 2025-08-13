import { Request, Response } from 'express';
import { addRevenue, getRevenues, getRevenueById, updateRevenue, deleteRevenue } from '../models/revenues';

export class RevenuesController {
  static async addRevenue(req: Request, res: Response) {
    try {
      const { value, data, description, category, paymentMethod, recurrence } = req.body;
      const revenue = { value, data, description, category, paymentMethod, recurrence };
      const id = await addRevenue(revenue);
      res.status(201).json({ message: 'Receita adicionada com sucesso', id });
    } catch (err) {
      console.error('[addRevenue] erro:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getRevenues(req: Request, res: Response) {
    try {
      const revenues = await getRevenues();
      res.status(200).json({ revenues, total: revenues.length });
    } catch (err) {
      console.error('[getRevenues] erro:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getRevenueById(req: Request, res: Response) {
    try {
      const revenue = await getRevenueById(req.params.id);
      if (!revenue) return res.status(404).json({ message: 'Receita não encontrada' });
      res.status(200).json({ revenue });
    } catch (err) {
      console.error('[getRevenueById] erro:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async updateRevenue(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { value, data, description, category, paymentMethod, recurrence } = req.body;
      const revenue = { value, data, description, category, paymentMethod, recurrence };
      const ok = await updateRevenue(id, revenue);
      if (!ok) return res.status(404).json({ message: 'Receita não encontrada' });
      res.status(200).json({ message: 'Receita atualizada com sucesso', id });
    } catch (err) {
      console.error('[updateRevenue] erro:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async deleteRevenue(req: Request, res: Response) {
    try {
      const ok = await deleteRevenue(req.params.id);
      if (!ok) return res.status(404).json({ message: 'Receita não encontrada' });
      res.status(200).json({ message: 'Receita excluída com sucesso', id: req.params.id });
    } catch (err) {
      console.error('[deleteRevenue] erro:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
