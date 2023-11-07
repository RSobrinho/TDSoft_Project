/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
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
    const page = params?.page ? params.page - 1 : 0;
    const limit = params?.limit || 10;
    const skip = page * limit;
    let createdAt;
    let paymentsParams;

    if (params.initialDate && params.finalDate) {
      const initialDate = this.val.prepareDate(params.initialDate);
      const finalDate = this.val.prepareDate(params.finalDate);

      createdAt = {
        $gte: moment(initialDate).startOf('day'),
        $lte: moment(finalDate).endOf('day'),
      };
    }

    if (params.paymentMethod) {
      paymentsParams = { 'payment.paymentMethod': params.paymentMethod };
      delete params.paymentMethod;
    }

    if (params.paymentAction) {
      paymentsParams = {
        ...paymentsParams,
        'payment.paymentAction': params.paymentAction,
      };
      delete params.paymentAction;
    }

    if (params.paymentValue) {
      paymentsParams = {
        ...paymentsParams,
        'payment.paymentValue': params.paymentValue,
      };
      delete params.paymentValue;
    }

    delete params.page;
    delete params.limit;
    delete params.initialDate;
    delete params.finalDate;

    let findParams = { ...params, ...paymentsParams };

    if (createdAt) findParams = { ...findParams, createdAt };

    return financeSchema.find(findParams).skip(skip).limit(limit);
  }
}
