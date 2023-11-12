import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { Transaction } from '../Transaction';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<ITransactionSchema>;
  update(id: string, params: any): Promise<any>;
  findOneById(id: string): Promise<ITransactionSchema | null>;
  listBy(params: any): Promise<ITransactionSchema[] | null>;
  listAll(params: any): Promise<any[]>;
}
