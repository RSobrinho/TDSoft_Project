/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { v4 } from 'uuid';
import { CreateTransactionRequest } from 'src/infrastructure/dtos/CreateTransactionDTO';
import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { ReviewCreditTransactionRequest } from 'src/infrastructure/dtos/ReviewCreditTransactionDTO';
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
} from '../infrastructure/dtos/GetAllTransactionDTO';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private paymentProvider: PaymentProvider,
  ) {}

  // async addTransaction({
  //   userId,
  //   payment,
  //   subscriptionId,
  // }: AddTransactionRequest): Promise<AddTransactionResponse> {
  //   await TransactionValidation.validateAsync({
  //     userId,
  //     payment,
  //     subscriptionId,
  //   });

  //   const paymentProviderResponse = await this.paymentProvider.doPayment();
  //   const newTransaction = new Transaction(
  //     v4(),
  //     userId,
  //     payment,
  //     paymentProviderResponse.success,
  //     subscriptionId,
  //   );

  //   this.transactionRepository.save(newTransaction);

  //   return newTransaction;
  // }

  getAllTransaction(params: GetAllTransactionRequest): Promise<Transaction[]> {
    return this.transactionRepository.listAll(params);
  }

  async getBalanceTransaction(
    id: string,
  ): Promise<GetBalanceTransactionResponse> {
    const transactions = await this.transactionRepository.listBy({
      recipientUserId: id,
    });

    return transactions?.reduce(
      (acc: any, curr: any) => {
        if (curr.type === TransactionTypeEnum.CREDIT) {
          if (curr.status === TransactionStatusEnum.APPROVED)
            acc.balance += curr.value;
          else if (curr.status === TransactionStatusEnum.PENDENT)
            acc.pendent += curr.value;
        } else {
          acc.balance -= curr.value;
        }
        return acc;
      },
      { balance: 0, pendent: 0 },
    );
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
