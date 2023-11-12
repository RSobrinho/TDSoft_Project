import { Payment, PaymentAction, PaymentMethod } from '../../model/Payment';

export interface AddTransactionRequest {
  userId: string;
  payment: Payment;
  subscriptionId?: string;
}

export interface AddTransactionResponse {
  _id: string;
  userId: string;
  payment: Payment;
  success: boolean;
  subscriptionId: string | null;
}
