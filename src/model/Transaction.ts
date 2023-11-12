/* eslint-disable no-underscore-dangle */

export enum TransactionTypeEnum {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TransactionStatusEnum {
  PENDENT = 'pendent',
  REJECTED = 'rejected',
  APPROVED = 'approved',
  CANCELED = 'canceled',
}

export class Transaction {
  _id: string;

  referenceId?: string | null;

  value: number;

  senderUserId: string;

  recipientUserId: string;

  description?: string | null;

  type: TransactionTypeEnum;

  status: TransactionStatusEnum;

  constructor(
    _id: string,
    senderUserId: string,
    recipientUserId: string,
    value: number,
    type: TransactionTypeEnum,
    status: TransactionStatusEnum,
    referenceId?: string,
    description?: string,
  ) {
    this._id = _id;
    this.senderUserId = senderUserId;
    this.recipientUserId = recipientUserId;
    this.value = value;
    this.type = type;
    this.status = status;
    this.referenceId = referenceId || null;
    this.description = description || null;
  }
}
