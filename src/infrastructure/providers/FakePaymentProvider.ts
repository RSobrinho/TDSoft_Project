import { PaymentProvider } from "../../model/interfaces/PaymentProvider";

export class FakePaymentProvider implements PaymentProvider {
    async doPayment(): Promise<boolean> {
        return Math.random() >= 0.05;
    }
}