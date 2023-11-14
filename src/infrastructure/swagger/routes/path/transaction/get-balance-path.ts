import { swaggerEnums } from 'src/infrastructure/swagger/utils/swagger-enums';
import { getBalanceResponse } from 'src/infrastructure/swagger/schemas/transaction/get-balance-schema';
import { errorResponseFormat } from '../../../schemas/exceptions/generic-error-schema';

export const GetBalancePath = {
  tags: [swaggerEnums.TRANSACTIONS],
  description: `Returns a user's balance`,
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
          schema: getBalanceResponse,
        },
      },
    },
    ...errorResponseFormat,
  },
};
