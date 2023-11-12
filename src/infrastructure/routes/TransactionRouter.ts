import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../model/exceptions/Handler';
import { transactionController } from '../../configs/TransactionContext';
import upload from '../utils/Multer';

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

router.route('/debit').post(
  asyncHandler((request: Request, response: Response) => {
    return transactionController.createDebitTransactionHandler(
      request,
      response,
    );
  }),
);

router.route('/credit').post(
  upload.single('receipt'),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.createCreditTransactionHandler(
      request,
      response,
    );
  }),
);

export default router;
