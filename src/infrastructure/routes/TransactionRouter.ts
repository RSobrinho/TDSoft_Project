import { Router, Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../model/exceptions/Handler';
import { transactionController } from '../../configs/TransactionContext';

const router = Router();

router.route('/').post(
  asyncHandler((request: Request, response: Response) => {
    return transactionController.addTransactionHandler(request, response);
  }),
);

router.route('/').get(
  asyncHandler((request: Request, response: Response) => {
    return transactionController.getAllTransactionHandler(request, response);
  }),
);

export default router;