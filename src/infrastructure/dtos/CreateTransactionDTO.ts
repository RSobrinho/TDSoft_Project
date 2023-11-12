import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from 'src/model/Transaction';

export interface CreateTransactionRequest {
  referenceId?: string;
  value: number;
  senderUserId: string;
  recipientUserId: string;
  description?: string;
  type: TransactionTypeEnum;
  status: TransactionStatusEnum;
}

export interface CreateTransactionResponse {}
