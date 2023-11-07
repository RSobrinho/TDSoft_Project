export interface PaymentProvider {
  doPayment(): Promise<any>;
}
