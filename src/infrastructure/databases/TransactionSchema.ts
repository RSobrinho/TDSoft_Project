import { Schema, model, Document } from 'mongoose';
import { Payment, PaymentAction, PaymentMethod } from '../../model/Payment';

export interface ITransactionSchema extends Document {
  _id: Schema.Types.Mixed;
  userId: string;
  payment: Payment;
  subscriptionId: string | null;
  success: boolean;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransactionSchema>({
  _id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  payment: {
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    paymentAction: {
      type: String,
      enum: Object.values(PaymentAction),
      required: true,
    },
    paymentValue: {
      type: Number,
      required: true,
    },
  },
  subscriptionId: {
    type: String,
    required: false,
  },
  success: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ITransactionSchema>('Finance', TransactionSchema);