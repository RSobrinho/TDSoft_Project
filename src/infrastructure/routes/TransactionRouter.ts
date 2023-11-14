import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../model/exceptions/Handler';
import { transactionController } from '../configs/TransactionContext';
import {hasRole, isAuthenticated} from '../authentication/AuthenticationHandler'
import upload from '../utils/Multer';

const router = Router();

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

router.route('/debit').post(
  hasRole('admin'),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.createDebitTransactionHandler(
      request,
      response,
    );
  }),
);

router.route('/credit/:transactionId').patch(
  hasRole('admin'),
  asyncHandler((request: Request, response: Response) => {
    return transactionController.reviewCreditTransactionHandler(
      request,
      response,
    );
  }),
);

export default router;
