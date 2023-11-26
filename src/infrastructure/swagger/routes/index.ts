import { AuthenticationPaths } from './authentication-routes';
import { TransactionPaths } from './transaction-routes';

export const swaggerRoutes = {
  ...AuthenticationPaths,
  ...TransactionPaths,
};
