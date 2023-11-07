import { PaymentProvider, PaymentProviderResponse } from "../../model/interfaces/PaymentProvider";

export class FakePaymentProvider implements PaymentProvider {
    async doPayment(): Promise<PaymentProviderResponse> {
        return {
            success: Math.random() >= 0.05
        };
    }
}