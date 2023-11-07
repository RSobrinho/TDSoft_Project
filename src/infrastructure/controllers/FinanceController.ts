import { Response, Request } from 'express'
import { FinanceService } from '../../application/FinanceService'

export class FinanceController {
  constructor (private financeService: FinanceService) {}

  async firstMethod (req: Request, res: Response): Promise<Response> {
    await this.financeService.firstMethod()
    return res.status(201).json({ status: 'Success', message: 'Test done successfully' })
  }
}
