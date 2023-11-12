import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { Transaction } from '../Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<ITransactionSchema>;
  listAll(params: any): Promise<any[]>;
}
