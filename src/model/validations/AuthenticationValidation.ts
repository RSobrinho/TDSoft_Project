import Joi from 'joi';
import { ValidationError } from '../exceptions/validationError';

export const AuthenticationReqValidation = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .error(new ValidationError('Invalid email!')),
  password: Joi.string()
    .min(1)
    .required()
    .error(new ValidationError('Invalid password!')),
});
