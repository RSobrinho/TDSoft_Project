import { GetBalancePath } from './path/transaction/get-balance-path';
import { GetExtractPath } from './path/transaction/get-extract-path';
import { PacthReviewCreditPath } from './path/transaction/patch-review-credit-path';
import { PostCreditPath } from './path/transaction/post-credit-path';
import { PostDebitPath } from './path/transaction/post-debit-path';

export const TransactionPaths = {
  '/balance': {
    get: GetBalancePath,
  },
  '/extract': {
    get: GetExtractPath,
  },
  '/debit': {
    post: PostDebitPath,
  },
  '/credit': {
    post: PostCreditPath,
  },
  '/credit/{transactionId}': {
    patch: PacthReviewCreditPath,
  },
};
