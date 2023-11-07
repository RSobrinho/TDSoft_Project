import { FinanceController } from '../infrastructure/controllers/FinanceController'
import { FinanceService } from '../application/FinanceService'
import { MongoDBFinanceRepository } from '../infrastructure/repositories/MongoDBFinanceRepository'
import { FakePaymentProvider } from '../infrastructure/providers/FakePaymentProvider'

const mongoDBFinanceRepository = new MongoDBFinanceRepository()
const fakePaymentProvider = new FakePaymentProvider()
const financeService = new FinanceService(mongoDBFinanceRepository, fakePaymentProvider)
const financeController = new FinanceController(financeService)

export { financeService , financeController } 