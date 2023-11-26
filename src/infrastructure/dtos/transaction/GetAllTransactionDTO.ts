import { PaymentAction, PaymentMethod } from '../../../model/Payment';

export interface GetAllTransactionRequest {
  intialDate?: string;
  finalDate?: string;
  userId?: string;
  status?: string;
  paymentMethod?: PaymentMethod;
  paymentAction?: PaymentAction;
  paymentValue?: number;
  page?: number;
  limit?: number;
}

export interface GetBalanceTransactionResponse {
  balance: number;
  pendent: number;
}

export interface AddTransactionResponse {
  _id: string;
  userId: string;
  paymentMethod: PaymentMethod;
  paymentAction: PaymentAction;
  success: boolean;
}
