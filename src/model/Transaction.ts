/* eslint-disable no-underscore-dangle */
import { Payment } from './Payment';

export class Transaction {
  _id: string;

  userId: string;

  payment: Payment;

  success: boolean;

  subscriptionId: string | null;

  constructor(
    _id: string,
    userId: string,
    payment: Payment,
    success: boolean,
    subscriptionId?: string | null,
  ) {
    this._id = _id;
    this.userId = userId;
    this.payment = payment;
    this.success = success;
    this.subscriptionId = subscriptionId || null;
  }
}
