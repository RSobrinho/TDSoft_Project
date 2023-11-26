/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { v4 } from 'uuid';
import { CreateTransactionRequest } from 'src/infrastructure/dtos/transaction/CreateTransactionDTO';
import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { ReviewCreditTransactionRequest } from 'src/infrastructure/dtos/transaction/ReviewCreditTransactionDTO';
import { NotFoundError } from 'src/model/exceptions/notFoundError';
import {
  Transaction,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../model/Transaction';
import { TransactionRepository } from '../model/interfaces/TransactionRepository';
import { PaymentProvider } from '../model/interfaces/PaymentProvider';
import {
  GetAllTransactionRequest,
  GetBalanceTransactionResponse,
} from '../infrastructure/dtos/transaction/GetAllTransactionDTO';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private paymentProvider: PaymentProvider,
  ) {}

  getAllTransaction(params: GetAllTransactionRequest): Promise<Transaction[]> {
    return this.transactionRepository.listAll(params);
  }

  async getBalanceTransaction(
    id: string,
  ): Promise<GetBalanceTransactionResponse> {
    const transactions = await this.transactionRepository.listBy({
      recipientUserId: id,
    });

    if (!transactions || transactions.length === 0)
      throw new NotFoundError('Transactions');

    const totals = transactions?.reduce(
      (acc: any, curr: any) => {
        if (curr.type === TransactionTypeEnum.CREDIT) {
          if (curr.status === TransactionStatusEnum.APPROVED) {
            acc.balance += curr.value;
            acc.credit.valueTotalApproved += curr.value;
            acc.credit.countApproved += 1;
          } else if (curr.status === TransactionStatusEnum.PENDENT) {
            acc.credit.valueTotalPendent += curr.value;
            acc.credit.countPendent += 1;
          }
        } else {
          acc.debit.valueTotal += curr.value;
          acc.debit.count += 1;
          acc.balance -= curr.value;
        }
        return acc;
      },
      {
        balance: 0,
        credit: {
          valueTotalApproved: 0,
          countApproved: 0,
          valueTotalPendent: 0,
          countPendent: 0,
        },
        debit: {
          valueTotal: 0,
          count: 0,
        },
      },
    );

    return { recipientUserId: id, ...totals };
  }

  async getExtractTransaction(
    id: string,
  ): Promise<ITransactionSchema[] | null> {
    const transactions = await this.transactionRepository.listBy({
      recipientUserId: id,
    });

    if (!transactions || transactions.length === 0)
      throw new NotFoundError('Transactions');

    return transactions;
  }

  async createTransaction({
    senderUserId,
    recipientUserId,
    status,
    type,
    value,
    description,
    referenceId,
    receipt,
    reviewerUserId,
    reviewAt,
  }: CreateTransactionRequest): Promise<ITransactionSchema> {
    const newTransaction = new Transaction(
      v4(),
      senderUserId,
      recipientUserId,
      value,
      type,
      status,
      referenceId,
      description,
      receipt,
      reviewerUserId,
      reviewAt,
    );

    return this.transactionRepository.save(newTransaction);
  }

  async reviewCreditTransaction(
    id: string,
    params: ReviewCreditTransactionRequest,
  ): Promise<ITransactionSchema | null> {
    const transaction = await this.transactionRepository.update(id, {
      ...params,
      reviewedAt: Date.now(),
    });

    if (!transaction) throw new NotFoundError('Transaction');

    return this.transactionRepository.findOneById(id);
  }
}
