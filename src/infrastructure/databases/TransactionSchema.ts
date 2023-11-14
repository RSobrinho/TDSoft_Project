import { Schema, model, Document } from 'mongoose';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../model/Transaction';

export interface ITransactionSchema extends Document {
  _id: Schema.Types.Mixed;

  referenceId?: Schema.Types.Mixed | null;

  value: number;

  senderUserId: Schema.Types.Mixed;

  recipientUserId: Schema.Types.Mixed;

  description?: string | null;

  type: TransactionTypeEnum;

  status: TransactionStatusEnum;

  createdAt?: Date | null;

  receipt?: string | null;

  reviewerUserId?: Schema.Types.Mixed;

  reviewedAt?: Date | null;
}

const TransactionSchema = new Schema<ITransactionSchema>({
  _id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  referenceId: {
    type: Schema.Types.Mixed,
    required: [false, 'referenceId invalid/not specified'],
  },
  senderUserId: {
    type: Schema.Types.Mixed,
    required: [true, 'senderUserId invalid/not specified'],
  },
  recipientUserId: {
    type: Schema.Types.Mixed,
    required: [true, 'recipientUserId invalid/not specified'],
  },
  description: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: [true, 'value invalid/not specified'],
  },
  type: {
    type: String,
    enum: Object.values(TransactionTypeEnum),
    required: [true, 'type invalid! accepted values: debit, credit'],
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatusEnum),
    required: [
      true,
      'type invalid! accepted values: pendent, rejected, approved, canceled',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  receipt: {
    type: String,
    required: false,
  },
  reviewerUserId: {
    type: Schema.Types.Mixed,
    required: [false, 'referenceId invalid/not specified'],
  },
  reviewedAt: {
    type: Date,
    required: false,
  },
});

export default model<ITransactionSchema>('Finance', TransactionSchema);
