import { errorsSwaggerComponents } from './errors-components';
import { transactionSwaggerComponents } from './transaction-components';

export const swaggerComponets = {
  schemas: {
    ...transactionSwaggerComponents,
    ...errorsSwaggerComponents,
  },
  securitySchemes: {
    BearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};
