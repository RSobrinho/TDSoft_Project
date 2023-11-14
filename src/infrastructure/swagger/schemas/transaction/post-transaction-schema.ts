import { transactionResponse } from './transaction-schema';

export const postTransactionRequest = {
  type: 'object',
  properties: {
    referenceId: { type: 'string' },
    senderUserId: {
      type: 'string',
    },
    recipientUserId: {
      type: 'string',
    },
    value: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
    receipt: {
      type: 'string',
    },
  },
};

export const postTransactionResponse = {
  type: 'object',
  properties: {
    status: { type: 'string' },
    message: {
      type: 'string',
    },
    transaction: transactionResponse,
  },
};
