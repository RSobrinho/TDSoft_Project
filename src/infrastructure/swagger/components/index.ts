import { errorsSwaggerComponents } from './errors-components';
import { transactionSwaggerComponents } from './transaction-components';

export const swaggerComponets = {
  schemas: {
    ...transactionSwaggerComponents,
    ...errorsSwaggerComponents,
  },
};
