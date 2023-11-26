import { swaggerRoutes } from './routes';
import { swaggerComponets } from './components';
import { swaggerEnums } from './utils/swagger-enums';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Finance Microservice',
    description: 'Backend for Finance Microservice',
  },
  components: swaggerComponets,
  tags: [
    { name: swaggerEnums.AUTHENTICATION },
    { name: swaggerEnums.TRANSACTIONS },
  ],
  paths: swaggerRoutes,
};
