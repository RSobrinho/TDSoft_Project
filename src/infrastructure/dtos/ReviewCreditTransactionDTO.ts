import { TransactionStatusEnum } from 'src/model/Transaction';

export interface ReviewCreditTransactionRequest {
  status: TransactionStatusEnum;
  reviewerUserId: string;
}

export interface ReviewCreditTransactionResponse {}
