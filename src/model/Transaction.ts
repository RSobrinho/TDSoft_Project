import TransactionValidation from './validations/TransactionValidation';

export enum PaymentMethod {
  PIX = 'pix',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum PaymentAction {
  NORMAL = 'normal',
  SUBSCRIPTION = 'subscription',
}

export class Transaction {
  _id: string;
  userId: string;
  paymentMethod: PaymentMethod;
  paymentAction: PaymentAction;
  paymentValue: number;
  success: boolean;
  subscriptionId: string | null;

  constructor(
    _id: string,
    userId: string,
    paymentMethod: PaymentMethod,
    paymentAction: PaymentAction,
    paymentValue: number,
    success: boolean,
    subscriptionId?: string | null,
  ) {
    this._id = _id;
    this.userId = userId;
    this.paymentMethod = paymentMethod;
    this.paymentAction = paymentAction;
    this.paymentValue = paymentValue;
    this.success = success;
    this.subscriptionId = subscriptionId || null;
  }
}
