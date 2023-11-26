/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import { ValidationError } from 'src/model/exceptions/validationError';
import { NotAuthorizedError } from 'src/model/exceptions/notAuthorizedError';
import {
  KeycloakGetTokenPayloadResponse,
  KeycloakGetTokenRequest,
  KeycloakJwtPayload,
} from './KeycloakJwtPayload';
import { AuthenticationRoutesEnum } from './AuthenticationEnum';

declare global {
  namespace Express {
    interface Request {
      user?: KeycloakJwtPayload & JwtPayload;
    }
  }
}

export class AuthenticationHandler {
  private authURL: string;

  constructor(authURL: string) {
    this.authURL = authURL;
    this.verify = this.verify.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  private async checkTokenExpiration(token: string): Promise<boolean> {
    try {
      const decodedToken = jsonwebtoken.decode(token) as JwtPayload;

      if (decodedToken && decodedToken.exp) {
        const expirationTime = new Date(decodedToken.exp * 1000); // Convertendo de segundos para milissegundos
        return expirationTime > new Date();
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  async getToken(
    params: KeycloakGetTokenRequest,
  ): Promise<KeycloakGetTokenPayloadResponse> {
    try {
      const url = `${this.authURL}${AuthenticationRoutesEnum.GET_TOKEN}`;

      const auth = await axios.post(
        url,
        {
          ...params,
          client_id: process.env.KEYCLOAK_CLIENT_ID || '',
          grant_type: 'password',
          scope: 'openid',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return auth;
    } catch (error) {
      throw error;
    }
  }

  private async verify(
    token: string,
  ): Promise<KeycloakJwtPayload & JwtPayload & any> {
    try {
      const url = `${this.authURL}${AuthenticationRoutesEnum.VALID_TOKEN}`;

      const data = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      throw new NotAuthorizedError('Invalid or unauthorized token!');
    }
  }

  public isAuthenticated() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        try {
          const isTokenValid = await this.checkTokenExpiration(token);

          if (!isTokenValid) {
            throw new NotAuthorizedError('Token has expired!');
          }

          const verifyToken = await this.verify(token);

          req.user = verifyToken;

          return next();
        } catch (error) {
          return next(error);
        }
      }

      return next(new ValidationError('Token not provided!'));
    };
  }

  setAuthUrl(url: string) {
    this.authURL = url;
  }
}
