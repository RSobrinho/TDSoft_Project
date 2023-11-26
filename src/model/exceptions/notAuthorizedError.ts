import { BaseError } from './baseError';

export class NotAuthorizedError extends BaseError {
  cause!: object;

  constructor(message: string, cause?: object) {
    super(401, message);

    if (cause) {
      this.cause = cause;
    }
  }
}
