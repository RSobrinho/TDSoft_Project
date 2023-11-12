import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../model/exceptions/Handler';
import { transactionController } from '../../configs/TransactionContext';
import upload from '../utils/Multer';

const router = Router();

router.route('/balance').get(
  asyncHandler((request: Request, response: Response) => {
    return transactionController.getBalanceHandler(request, response);
  }),
);

router.route('/extract').get(
  asyncHandler((request: Request, response: Response) => {
    return transactionController.getExtractHandler(request, response);
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

router.route('/credit/:transactionId').patch(
  asyncHandler((request: Request, response: Response) => {
    return transactionController.reviewCreditTransactionHandler(
      request,
      response,
    );
  }),
);

export default router;
