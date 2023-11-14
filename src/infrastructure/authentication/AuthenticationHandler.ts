import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

import { KeycloakJwtPayload } from './KeycloakJwtPayload';

const client = jwksRsa({
    jwksUri: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
  });

export class AuthenticationHandler {
    client: jwksRsa.JwksClient

    constructor() {
        this.client = this.getClient()
    }


    private getClient() {
        return jwksRsa({
            jwksUri: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
          });
    }

    private getKey(header: any, callback: (err: Error | null, key?: string) => any) {
        client
          .getSigningKey(header.kid)
          .then((key) => callback(null, key.getPublicKey()))
          .catch(callback);
      }

    private verify(token: string) {
        return new Promise<KeycloakJwtPayload & JwtPayload>((resolve, reject) => {
          jsonwebtoken.verify(token, this.getKey, {}, function (err, decoded) {
            if (err) return reject(new Error(err.message || JSON.stringify(err)));
            return resolve(decoded as KeycloakJwtPayload & JwtPayload);
          });
        });
      }

    public isAuthenticated() {
        return async (req: Request, res: Response, next: NextFunction) => {
          const token = req.headers.authorization?.split(' ')[1];
      
          if (token) {
            return this.verify(token)
              .then(({ realm_access, ...decoded }) => {
                req.user = { ...decoded, roles: realm_access.roles || [] };
                return next();
              })
              .catch((error) => next(error));
          }
      
          return next(new Error());
        };
      }
      

      public hasRole(role: 'admin') {
        return async (req: Request, res: Response, next: NextFunction) => {
          const callback: NextFunction = (error) => {
            if (error) return next(error);
            if (req.user?.roles.includes(role)) return next();
            return new Error();
          };
      
          return req.user ? callback() : this.isAuthenticated()(req, res, callback);
        };
      }

}
