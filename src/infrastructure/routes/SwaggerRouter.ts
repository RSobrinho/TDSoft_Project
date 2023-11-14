/* istanbul ignore file */

import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
// import * as healthCheckController from '../api/health-check/health-check.controller';
import { swaggerDocument } from '../swagger';

const SwaggerRouter = Router();
// swaggerRouter.get('/health', healthCheckController.check);

const customCss =
  '.swagger-ui table tbody tr td:first-of-type { min-width: 12em; }';

const swaggerOptions = {
  customCss,
  customSiteTitle: 'Finance Microservice',
};

SwaggerRouter.use('/api-docs', swaggerUi.serve, (req: any, res: any) => {
  res.status(200).send(swaggerUi.generateHTML(swaggerDocument, swaggerOptions));
});

export default SwaggerRouter;
