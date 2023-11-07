export enum PaymentMethod {
  PIX = 'pix',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum PaymentAction {
  NORMAL = 'normal',
  SUBSCRIPTION = 'subscription',
}

export class Payment {
    method: PaymentMethod;
    action: PaymentAction;
    value: number;

  constructor(
    method: PaymentMethod,
    action: PaymentAction,
    value: number,
  ) {
    this.method = method;
    this.action = action;
    this.value = value;
  }
}
