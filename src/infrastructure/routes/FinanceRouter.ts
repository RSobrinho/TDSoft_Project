import { Router, Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../model/exceptions/handler';
import { financeController } from '../../configs/FinanceContext';

const router = Router();

router.route('/').post(
  asyncHandler((request: Request, response: Response) => {
    return financeController.addTransactionHandler(request, response);
  }),
);

router.route('/').get(
  asyncHandler((request: Request, response: Response) => {
    return financeController.getAllTransactionHandler(request, response);
  }),
);

export default router;
