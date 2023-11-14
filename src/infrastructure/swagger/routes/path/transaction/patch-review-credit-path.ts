import { swaggerEnums } from 'src/infrastructure/swagger/utils/swagger-enums';
import { postTransactionResponse } from 'src/infrastructure/swagger/schemas/transaction/post-transaction-schema';
import { patchReviewCreditRequest } from 'src/infrastructure/swagger/schemas/transaction/patch-review-credit-schema';
import { errorResponseFormat } from '../../../schemas/exceptions/generic-error-schema';

export const PacthReviewCreditPath = {
  tags: [swaggerEnums.TRANSACTIONS],
  description: 'Review a credit transaction',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      required: true,
      name: 'transactionId',
      type: 'string',
    },
    {
      in: 'body',
      required: true,
      schema: patchReviewCreditRequest,
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: postTransactionResponse,
        },
      },
    },
    ...errorResponseFormat,
  },
};
