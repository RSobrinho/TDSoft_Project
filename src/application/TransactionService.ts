/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { v4 } from 'uuid';
import { Transaction } from '../model/Transaction';
import { TransactionRepository } from '../model/interfaces/TransactionRepository';
import { PaymentProvider } from '../model/interfaces/PaymentProvider';
import {
  AddTransactionRequest,
  AddTransactionResponse,
} from '../infrastructure/dtos/AddTransactionDTO';
import { GetAllTransactionRequest } from '../infrastructure/dtos/GetAllTransactionDTO';
import TransactionValidation from '../model/validations/TransactionValidation';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private paymentProvider: PaymentProvider,
  ) {}

  async addTransaction({
    userId,
    payment,
    subscriptionId,
  }: AddTransactionRequest): Promise<AddTransactionResponse> {
    await TransactionValidation.validateAsync({
      userId,
      payment,
      subscriptionId,
    });

    const paymentProviderResponse = await this.paymentProvider.doPayment();
    const newTransaction = new Transaction(
      v4(),
      userId,
      payment,
      paymentProviderResponse.success,
      subscriptionId,
    );

    this.transactionRepository.save(newTransaction);

    return newTransaction;
  }

  getAllTransaction(params: GetAllTransactionRequest): Promise<Transaction[]> {
    return this.transactionRepository.listAll(params);
  }
}
