import { Response, Request } from 'express'
import { FinanceService } from '../../application/FinanceService'

export class FinanceController {
  constructor (private financeService: FinanceService) {}

  async addTransactionHandler (req: Request, res: Response): Promise<Response> {
    const newTransaction = await this.financeService.addTransaction(req.body)
    return res.status(201).json({ status: 'Success', message: 'Test done successfully', newTransaction })
  }
}
