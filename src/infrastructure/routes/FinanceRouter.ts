import { Router, Request, Response, NextFunction } from 'express'
import { asyncHandler } from '../../model/Exceptions/handler'
import { financeController } from '../../configs/FinanceContext'

const router = Router()

router.route('/')
.post(asyncHandler((request: Request, response: Response) => {
    return financeController.firstMethod(request, response)
  }))

export default router
