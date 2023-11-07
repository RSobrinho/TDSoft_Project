import { PaymentAction, PaymentMethod } from "../../model/Transaction";

export interface AddTransactionRequest {
    userId: string
    paymentMethod: PaymentMethod
    paymentAction: PaymentAction
}

export interface AddTransactionResponse {
    id: string
    userId: string
    paymentMethod: PaymentMethod
    paymentAction: PaymentAction
    success: boolean
}