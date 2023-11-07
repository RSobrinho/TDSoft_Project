import { v4 } from 'uuid';
import { Transaction } from '../model/Transaction';
import { IFinanceRepository } from '../model/interfaces/IFinanceRepository';
import { PaymentProvider } from '../model/interfaces/PaymentProvider';
import {
  AddTransactionRequest,
  AddTransactionResponse,
} from '../infrastructure/dtos/AddTransactionDTO';
import { getAllTransactionRequest } from '../infrastructure/dtos/GetAllTransactionDTO';

export class FinanceService {
  constructor(
    private transactionRepository: IFinanceRepository,
    private paymentProvider: PaymentProvider,
  ) {}

  async addTransaction({
    userId,
    paymentMethod,
    paymentAction,
  }: AddTransactionRequest): Promise<AddTransactionResponse> {
    const isSuccess = await this.paymentProvider.doPayment(); // todo: fix this
    const newTransaction = new Transaction(
      v4(),
      userId,
      paymentMethod,
      paymentAction,
      isSuccess,
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
