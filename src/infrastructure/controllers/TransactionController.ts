/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express';
import { TransactionService } from '../../application/TransactionService';

export class TransactionController {
  constructor(private financeService: TransactionService) {}

  async addTransactionHandler(req: Request, res: Response): Promise<Response> {
    const newTransaction = await this.financeService.addTransaction(req.body);

    return res.status(201).json({
      status: 'Success',
      message: 'Transaction saved successfully!',
      newTransaction,
    });
  }

  async getAllTransactionHandler(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const data = await this.financeService.getAllTransaction(req.query);

    return res.status(200).json({ total: data.length, transactions: data });
  }
}
