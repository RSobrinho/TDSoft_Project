import { PaymentAction, PaymentMethod } from '../../model/Transaction';

export interface getAllTransactionRequest {
  intialDate?: string;
  finalDate?: string;
  userId?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AddTransactionResponse {
  _id: string;
  userId: string;
  paymentMethod: PaymentMethod;
  paymentAction: PaymentAction;
  success: boolean;
}
