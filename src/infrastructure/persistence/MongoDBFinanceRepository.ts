import { IFinanceRepository } from '../../model/interfaces/IFinanceRepository'
import { Transaction } from '../../model/Transaction';

export class MongoDBFinanceRepository implements IFinanceRepository {
    save(transaction: Transaction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}