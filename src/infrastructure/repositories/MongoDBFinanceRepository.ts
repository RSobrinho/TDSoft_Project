import { Transaction } from '../../model/Transaction';
import { IFinanceRepository } from '../../model/interfaces/IFinanceRepository'
import financeSchema from '../databases/FinanceSchema';

export class MongoDBFinanceRepository implements IFinanceRepository {
    async save(transaction: Transaction): Promise<void> {
        const sla = await financeSchema.create(transaction)
        console.log(transaction) // todo: remove logs after implementation
        console.log(sla);
    }
}