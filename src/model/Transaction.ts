export enum PaymentMethod {
    PIX = 'pix',
    CREDIT = 'credit',
    DEBIT = 'debit'
}

export enum PaymentAction {
    NORMAL = 'normal',
    SUBSCRIPTION = 'subscription'
}

export class Transaction {
    id: string;
    userId: string;
    paymentMethod: PaymentMethod;
    paymentAction: PaymentAction;
    success: boolean;

    constructor(
        id: string,
        userId: string,
        paymentMethod: PaymentMethod,
        paymentAction: PaymentAction,
        success: boolean
    ) {
        this.id = id;
        this.userId = userId;
        this.paymentMethod = paymentMethod;
        this.paymentAction = paymentAction;
        this.success = success;
    }
}