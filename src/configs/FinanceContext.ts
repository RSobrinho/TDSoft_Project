import { FinanceController } from '../infrastructure/controllers/FinanceController'
import { FinanceService } from '../application/FinanceService'
import { MongoDBFinanceRepository } from '../infrastructure/persistence/MongoDBFinanceRepository'

const mongoDBFinanceRepository = new MongoDBFinanceRepository()
const financeService = new FinanceService(mongoDBFinanceRepository)
const financeController = new FinanceController(financeService)

export { financeService , financeController } 