import { swaggerEnums } from 'src/infrastructure/swagger/utils/swagger-enums';
import { transactionResponse } from 'src/infrastructure/swagger/schemas/transaction/transaction-schema';
import { errorResponseFormat } from '../../../schemas/exceptions/generic-error-schema';

export const GetExtractPath = {
  tags: [swaggerEnums.TRANSACTIONS],
  description: `Returns a user's extract`,
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'query',
      name: 'recipientId',
      required: true,
      type: 'string',
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              ...transactionResponse,
            },
          },
        },
      },
    },
    ...errorResponseFormat,
  },
};
