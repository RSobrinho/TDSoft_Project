import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

import { KeycloakJwtPayload } from './KeycloakJwtPayload';


const client = jwksRsa({
  jwksUri: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
});

function getKey(header: any, callback: (err: Error | null, key?: string) => any) {
  client
    .getSigningKey(header.kid)
    .then((key) => callback(null, key.getPublicKey()))
    .catch(callback);
}

function verify(token: string) {
  return new Promise<KeycloakJwtPayload & JwtPayload>((resolve, reject) => {
    jsonwebtoken.verify(token, getKey, {}, function (err, decoded) {
      if (err) return reject(new Error(err.message || JSON.stringify(err)));
      return resolve(decoded as KeycloakJwtPayload & JwtPayload);
    });
  });
}

export function isAuthenticated() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      return verify(token)
        .then(({ realm_access, ...decoded }) => {
          (req as any).user = { ...decoded, roles: realm_access.roles || [] };
          return next();
        })
        .catch((error) => next(error));
    }

    return next(new Error());
  };
}

export function hasRole(role: 'admin') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const callback: NextFunction = (error) => {
      if (error) return next(error);
      if ((req as any).user?.roles.includes(role)) return next();
      return new Error();
    };

    return (req as any).user ? callback() : isAuthenticated()(req, res, callback);
  };
}