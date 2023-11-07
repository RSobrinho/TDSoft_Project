import { IFinanceRepository } from '../model/interfaces/IFinanceRepository'

export class FinanceService {
    constructor (private transactionRepository: IFinanceRepository) {}
    
    public firstMethod(): void {
        throw new Error("Method not implemented yet")
    }
}