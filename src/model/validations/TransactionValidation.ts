import Joi from 'joi';
import { ValidationError } from '../exceptions/validationError';
import { TransactionStatusEnum } from '../Transaction';

export const TransactionDebitReqValidation = Joi.object({
  senderUserId: Joi.string()
    .required()
    .min(1)
    .error(new ValidationError('Invalid senderUserId!')),
  recipientUserId: Joi.string()
    .min(1)
    .required()
    .error(new ValidationError('Invalid recipientUserId!')),
  value: Joi.number()
    .positive()
    .required()
    .error(new ValidationError('Invalid value!')),
  description: Joi.string()
    .optional()
    .min(10)
    .error(
      new ValidationError(
        'Invalid description! Size must be at least 10 characters',
      ),
    ),
  referenceId: Joi.string()
    .optional()
    .min(1)
    .error(new ValidationError('Invalid referenceId!')),
});

export const TransactionCreditReqValidation = Joi.object({
  receipt: Joi.string()
    .required()
    .min(1)
    .error(new ValidationError('Invalid receipt!')),
}).concat(TransactionDebitReqValidation);

export const TransactionCreditReviewReqValidation = Joi.object({
  transactionId: Joi.string()
    .required()
    .min(1)
    .error(new ValidationError('Invalid transactionId!')),
  reviewerUserId: Joi.string()
    .required()
    .min(1)
    .error(new ValidationError('Invalid reviewerUserId!')),
  status: Joi.valid(...Object.values(TransactionStatusEnum))
    .required()
    .error(
      new ValidationError(
        'Invalid status! Allowed status: pendent, rejected, approved, canceled',
      ),
    ),
});

export const TransactionValidation = Joi.object({
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
