import { Transaction } from '../Transaction';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  listAll(params: any): Promise<any[]>;
}
