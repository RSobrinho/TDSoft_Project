import { swaggerEnums } from 'src/infrastructure/swagger/utils/swagger-enums';
import {
  postTransactionRequest,
  postTransactionResponse,
} from 'src/infrastructure/swagger/schemas/transaction/post-transaction-schema';
import { errorResponseFormat } from '../../../schemas/exceptions/generic-error-schema';

export const PostCreditPath = {
  tags: [swaggerEnums.TRANSACTIONS],
  description: 'Post a new credit for a user in the system',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      required: true,
      schema: postTransactionRequest,
    },
  ],
  responses: {
    201: {
      content: {
        'application/json': {
          schema: postTransactionResponse,
        },
      },
    },
    ...errorResponseFormat,
  },
};
