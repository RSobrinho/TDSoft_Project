import { Schema, model, Document } from 'mongoose'
import { PaymentAction, PaymentMethod } from '../../model/Transaction';

interface IFinanceSchema extends Document {
    _id: Schema.Types.Mixed,
    userId: string,
    paymentMethod: PaymentMethod,
    paymentAction: PaymentAction,
    success: Boolean
}

const FinanceSchema = new Schema<IFinanceSchema>({
    _id: { 
        type: Schema.Types.Mixed, required: true 
    },
    userId: { 
        type: String, required: true 
    },
    paymentMethod: { 
        type: String, enum: Object.values(PaymentMethod), required: true 
    },
    paymentAction: { 
        type: String, enum: Object.values(PaymentAction), required: true 
    },
    success: { 
        type: Boolean, required: true 
    },
});

export default model<IFinanceSchema>('Finance', FinanceSchema);