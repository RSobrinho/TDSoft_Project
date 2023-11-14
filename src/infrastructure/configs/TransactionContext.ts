import { TransactionController } from '../controllers/TransactionController';
import { TransactionService } from '../../application/TransactionService';
import { MongoDBTransactionRepository } from '../repositories/MongoDBTransactionRepository';
import { FakePaymentProvider } from '../providers/FakePaymentProvider';

const mongoDBTransactionRepository = new MongoDBTransactionRepository();
const fakePaymentProvider = new FakePaymentProvider();
const transactionService = new TransactionService(
  mongoDBTransactionRepository,
  fakePaymentProvider,
);

const transactionController = new TransactionController(transactionService);

export { transactionService, transactionController };
