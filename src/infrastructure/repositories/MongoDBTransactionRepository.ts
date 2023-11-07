import moment from 'moment';
import { Transaction } from '../../model/Transaction';
import { TransactionRepository } from '../../model/interfaces/TransactionRepository';
import UtilsValidation from '../../model/validations/UtilsValidation';
import financeSchema from '../databases/TransactionSchema';

export class MongoDBTransactionRepository implements TransactionRepository {
  val = new UtilsValidation();

  async save(transaction: Transaction): Promise<void> {
    await financeSchema.create(transaction);
  }

  async listAll(params?: any): Promise<any[]> {
    const page = params?.page - 1 || 0;
    const limit = params?.limit || 10;
    const skip = page * limit;

    if (params.initialDate && params.finalDate) {
      const initialDate = this.val.prepareDate(params.initialDate);
      const finalDate = this.val.prepareDate(params.finalDate);

      params.createdAt = {
        $gte: moment(initialDate).startOf('day'),
        $lte: moment(finalDate).endOf('day'),
      };
    }

    delete params.page;
    delete params.limit;
    delete params.initialDate;
    delete params.finalDate;

    return financeSchema.find(params).skip(skip).limit(limit);
  }
}
