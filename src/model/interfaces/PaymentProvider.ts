export interface PaymentProviderResponse {
  success: boolean;
}

export interface PaymentProvider {
  doPayment(): Promise<PaymentProviderResponse>;
}
