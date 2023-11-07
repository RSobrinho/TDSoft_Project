export interface IFinanceRepository {
    save(transaction: Transaction): Promise<void>
}