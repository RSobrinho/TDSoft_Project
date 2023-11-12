import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { Transaction } from '../Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<ITransactionSchema>;
  update(id: string, params: any): Promise<any>;
  listById(id: string): Promise<ITransactionSchema | null>;
  listAll(params: any): Promise<any[]>;
}
