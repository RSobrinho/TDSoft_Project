import { v4 } from 'uuid';
import { Transaction } from '../model/Transaction';
import { IFinanceRepository } from '../model/interfaces/IFinanceRepository';
import { PaymentProvider } from '../model/interfaces/PaymentProvider';
import {
  AddTransactionRequest,
  AddTransactionResponse,
} from '../infrastructure/dtos/AddTransactionDTO';
import { getAllTransactionRequest } from '../infrastructure/dtos/GetAllTransactionDTO';
import TransactionValidation from '../model/validations/TransactionValidation';

export class FinanceService {
  constructor(
    private transactionRepository: IFinanceRepository,
    private paymentProvider: PaymentProvider,
  ) {}

  async addTransaction({
    userId,
    paymentMethod,
    paymentAction,
    paymentValue,
    subscriptionId,
  }: AddTransactionRequest): Promise<AddTransactionResponse> {
    await TransactionValidation.validateAsync({
      userId,
      paymentMethod,
      paymentAction,
      paymentValue,
      subscriptionId,
    });

    const isSuccess = await this.paymentProvider.doPayment(); // todo: fix this
    const newTransaction = new Transaction(
      v4(),
      userId,
      paymentMethod,
      paymentAction,
      paymentValue,
      isSuccess,
      subscriptionId,
    );

    this.transactionRepository.save(newTransaction);

    return newTransaction;
  }

  async getAllTransaction(
    params: getAllTransactionRequest,
  ): Promise<Transaction[]> {
    const ts = await this.transactionRepository.listAll(params);

    return ts;
  }
}
