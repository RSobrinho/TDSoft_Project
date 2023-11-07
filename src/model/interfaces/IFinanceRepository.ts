import { Transaction } from "../Transaction"

export interface IFinanceRepository {
    save(transaction: Transaction): Promise<void>
}