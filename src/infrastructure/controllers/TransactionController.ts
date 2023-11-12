/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express';
import { TransactionDebitReqValidation } from 'src/model/validations/TransactionValidation';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from 'src/model/Transaction';
import { TransactionService } from '../../application/TransactionService';

export class TransactionController {
  constructor(private financeService: TransactionService) {}

  async addTransactionHandler(req: Request, res: Response): Promise<Response> {
    const newTransaction = await this.financeService.createTransaction(
      req.body,
    );

    return res.status(201).json({
      status: 'Success',
      message: 'Transaction saved successfully!',
      newTransaction,
    });
  }

  async createDebitTransactionHandler(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { body } = req;
    await TransactionDebitReqValidation.validateAsync(body);

    const transaction = await this.financeService.createTransaction({
      ...body,
      type: TransactionTypeEnum.DEBIT,
      status: TransactionStatusEnum.APPROVED,
    });

    return res.status(201).json({
      status: 'Success',
      message: 'Debit Transaction saved successfully!',
      transaction,
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
