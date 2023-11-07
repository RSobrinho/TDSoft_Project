import { Schema, model, Document } from 'mongoose';
import { PaymentAction, PaymentMethod } from '../../model/Transaction';

export interface IFinanceSchema extends Document {
  _id: Schema.Types.Mixed;
  userId: string;
  paymentMethod: PaymentMethod;
  paymentAction: PaymentAction;
  paymentValue: number;
  subscriptionId: string | null;
  success: boolean;
  createdAt: Date;
}

const FinanceSchema = new Schema<IFinanceSchema>({
  _id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
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

export default model<IFinanceSchema>('Finance', FinanceSchema);
