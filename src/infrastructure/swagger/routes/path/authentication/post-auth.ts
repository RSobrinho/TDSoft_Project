import { swaggerEnums } from 'src/infrastructure/swagger/utils/swagger-enums';
import {
  postAuthRequest,
  postAuthResponse,
} from 'src/infrastructure/swagger/schemas/authentication/post-auth-schema';
import { errorResponseFormat } from '../../../schemas/exceptions/generic-error-schema';

export const PostAuthPath = {
  tags: [swaggerEnums.AUTHENTICATION],
  description: 'Request new authentication',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      required: true,
      schema: postAuthRequest,
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: postAuthResponse,
        },
      },
    },
    ...errorResponseFormat,
  },
};
