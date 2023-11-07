import { PaymentAction, PaymentMethod } from "../../model/Transaction";

export interface AddTransactionRequest {
    userId: string
    paymentMethod: PaymentMethod
    paymentAction: PaymentAction
}

export interface AddTransactionResponse {
    _id: string
    userId: string
    paymentMethod: PaymentMethod
    paymentAction: PaymentAction
    success: boolean
}