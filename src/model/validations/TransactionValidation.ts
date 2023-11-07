import Joi from 'joi';
import { ValidationError } from '../exceptions/validationError';

const TransactionValidation = Joi.object({
  userId: Joi.string()
    .min(1)
    .required()
    .error(new ValidationError('Invalid userId!')),
  payment: Joi.object({
    paymentMethod: Joi.valid('pix', 'credit', 'debit')
      .required()
      .error(
        new ValidationError(
          'Invalid paymentMethod! Allowed methods: pix, credit, debit',
        ),
      ),
    paymentAction: Joi.valid('normal', 'subscription')
      .required()
      .error(
        new ValidationError(
          'Invalid paymentAction! Allowed actions: normal, subscription',
        ),
      ),
    paymentValue: Joi.number()
      .positive()
      .required()
      .error(new ValidationError('Invalid paymentValue!')),
  }).required(),

  subscriptionId: Joi.string()
    .optional()
    .min(1)
    .error(new ValidationError('Invalid subscriptionId!')),
});

export default TransactionValidation;
