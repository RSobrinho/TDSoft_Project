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
    _id: string;
    userId: string;
    paymentMethod: PaymentMethod;
    paymentAction: PaymentAction;
    success: boolean;

    constructor(
        _id: string,
        userId: string,
        paymentMethod: PaymentMethod,
        paymentAction: PaymentAction,
        success: boolean
    ) {
        this._id = _id;
        this.userId = userId;
        this.paymentMethod = paymentMethod;
        this.paymentAction = paymentAction;
        this.success = success;
    }
}