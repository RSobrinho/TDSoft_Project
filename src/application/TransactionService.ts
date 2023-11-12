/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { v4 } from 'uuid';
import { CreateTransactionRequest } from 'src/infrastructure/dtos/CreateTransactionDTO';
import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { Transaction } from '../model/Transaction';
import { TransactionRepository } from '../model/interfaces/TransactionRepository';
import { PaymentProvider } from '../model/interfaces/PaymentProvider';
import { GetAllTransactionRequest } from '../infrastructure/dtos/GetAllTransactionDTO';

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

    const res = this.transactionRepository.save(newTransaction);

    return res;
  }
}
