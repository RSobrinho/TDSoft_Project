import { Transaction } from '../Transaction';

export interface IFinanceRepository {
  save(transaction: Transaction): Promise<void>;
  listAll(params: any): Promise<Transaction[]>;
}
