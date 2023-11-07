import Joi from 'joi';

const TransactionValidation = Joi.object({
  userId: Joi.string().min(1).required().error(new Error('Invalid userId!')),
  paymentMethod: Joi.valid('pix', 'credit', 'debit')
    .required()
    .error(
      new Error('Invalid paymentMethod! Allowed methods: pix, credit, debit'),
    ),

  paymentAction: Joi.valid('normal', 'subscription')
    .required()
    .error(
      new Error('Invalid paymentAction! Allowed actions: normal, subscription'),
    ),

  paymentValue: Joi.number()
    .positive()
    .required()
    .error(new Error('Invalid paymentValue!')),

  subscriptionId: Joi.string()
    .optional()
    .min(1)
    .error(new Error('Invalid subscriptionId!')),
});

export default TransactionValidation;
