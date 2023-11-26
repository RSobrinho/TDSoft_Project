import { Router, Request, Response } from 'express';
import { authenticationHandler } from 'src/configs/AuthenticationContext';
import { asyncHandler } from '../../model/exceptions/handler';
import { transactionController } from '../../configs/TransactionContext';

import upload from '../utils/Multer';

const router = Router();

const { isAuthenticated } = authenticationHandler;

router.route('/balance').get(
  isAuthenticated(),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.getBalanceHandler(request, response);
  }),
);

router.route('/extract').get(
  isAuthenticated(),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.getExtractHandler(request, response);
  }),
);

router.route('/debit').post(
  isAuthenticated(),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.createDebitTransactionHandler(
      request,
      response,
    );
  }),
);

router.route('/credit').post(
  isAuthenticated(),
  upload.single('receipt'),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.createCreditTransactionHandler(
      request,
      response,
    );
  }),
);

router.route('/credit/:transactionId').patch(
  isAuthenticated(),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.reviewCreditTransactionHandler(
      request,
      response,
    );
  }),
);

export default router;
