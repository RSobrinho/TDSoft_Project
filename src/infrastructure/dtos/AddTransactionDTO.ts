import { PaymentAction, PaymentMethod } from '../../model/Transaction';

export interface AddTransactionRequest {
  userId: string;
  paymentMethod: PaymentMethod;
  paymentAction: PaymentAction;
  paymentValue: number;
  subscriptionId?: string;
}

export interface AddTransactionResponse {
  _id: string;
  userId: string;
  paymentMethod: PaymentMethod;
  paymentAction: PaymentAction;
  paymentValue: number;
  success: boolean;
  subscriptionId: string | null;
}
