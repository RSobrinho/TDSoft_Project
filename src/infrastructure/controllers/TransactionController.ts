/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express';
import {
  TransactionCreditReqValidation,
  TransactionCreditReviewReqValidation,
  TransactionDebitReqValidation,
} from 'src/model/validations/TransactionValidation';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from 'src/model/Transaction';
import { ValidationError } from 'src/model/exceptions/validationError';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';
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

  async createCreditTransactionHandler(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { body } = req;

    if (await TransactionCreditReqValidation.validate(body).value)
      try {
        await TransactionCreditReqValidation.validateAsync(body);
      } catch (e) {
        if (!body.receipt)
          throw new ValidationError('receipt invalid/not found');
        const filePath = join('uploads', body.receipt);

        if (existsSync(filePath)) rmSync(filePath);

        throw e;
      }

    const transaction = await this.financeService.createTransaction({
      ...body,
      type: TransactionTypeEnum.CREDIT,
      status: TransactionStatusEnum.PENDENT,
    });

    return res.status(201).json({
      status: 'Success',
      message: 'Credit Transaction saved successfully!',
      transaction,
    });
  }

  async reviewCreditTransactionHandler(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { body } = req;
    const { transactionId } = req.params;
    await TransactionCreditReviewReqValidation.validateAsync({
      ...body,
      transactionId,
    });

    const transaction = await this.financeService.reviewCreditTransaction(
      transactionId,
      body,
    );

    return res.status(200).json({
      status: 'Success',
      message: 'Credit Transaction reviewed successfully!',
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

  async getBalanceHandler(req: Request, res: Response): Promise<Response> {
    const recipientId = req.query?.recipientId?.toString();

    if (!recipientId) throw new ValidationError('recipientId invalid!');

    const data = await this.financeService.getBalanceTransaction(recipientId);

    return res.status(200).json(data);
  }

  async getExtractHandler(req: Request, res: Response): Promise<Response> {
    const recipientId = req.query?.recipientId?.toString();

    if (!recipientId) throw new ValidationError('recipientId invalid!');

    const data = await this.financeService.getExtractTransaction(recipientId);

    return res.status(200).json(data);
  }
}
