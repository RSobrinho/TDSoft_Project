/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
import { ITransactionSchema } from 'src/infrastructure/databases/TransactionSchema';
import { AuthenticationHandler } from 'src/infrastructure/authentication/AuthenticationHandler';
import { LoginRequest } from 'src/infrastructure/dtos/authentication/LoginDTO';
import { NotAuthorizedError } from 'src/model/exceptions/notAuthorizedError';

export class AuthenticationService {
  constructor(private authenticationHandler: AuthenticationHandler) {}

  async login({
    email,
    password,
  }: LoginRequest): Promise<ITransactionSchema | any> {
    try {      

      const { data } = await this.authenticationHandler.getToken({
        username: email,
        password,
      });

      return { accessToken: data.access_token };
    } catch (error) {
      throw new NotAuthorizedError('Invalid email or password!');
    }
  }
}
