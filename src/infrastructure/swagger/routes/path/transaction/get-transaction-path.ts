import { transactionResponse } from '../../../schemas/transaction/transaction-schema';
import { errorResponseFormat } from '../../../schemas/exceptions/generic-error-schema';

export const GetTransactionPath = {
  tags: ['TEST'],
  description: 'Retorna a lista de endereços cadastrados do usuário',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'order_id',
      required: true,
      type: 'string',
    },
    {
      in: 'path',
      name: 'shipping_id',
      required: true,
      type: 'string',
      example: 'default - me',
    },
    {
      in: 'query',
      name: 'orderNo',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: transactionResponse,
        },
      },
    },
    ...errorResponseFormat,
  },
};
