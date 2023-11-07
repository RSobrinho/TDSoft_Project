import { Schema, model, Document } from 'mongoose'
import { PaymentAction, PaymentMethod } from '../../model/Transaction';

interface IFinanceSchema extends Document {
    _id: Schema.Types.Mixed,
    user_id: number,
    payment_method: PaymentMethod,
    payment_action: PaymentAction,
    success: Boolean
}

const FinanceSchema = new Schema<IFinanceSchema>({
    _id: { 
        type: Schema.Types.Mixed, required: true 
    },
    user_id: { 
        type: Number, required: true 
    },
    payment_method: { 
        type: String, enum: Object.values(PaymentMethod), required: true 
    },
    payment_action: { 
        type: String, enum: Object.values(PaymentAction), required: true 
    },
    success: { 
        type: Boolean, required: true 
    },
});

export default model<IFinanceSchema>('Finance', FinanceSchema);