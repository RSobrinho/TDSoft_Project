import { AuthenticationController } from 'src/infrastructure/controllers/AuthenticationController';
import { AuthenticationService } from 'src/application/AuthenticationService';
import { config } from 'dotenv';
import { AuthenticationHandler } from '../infrastructure/authentication/AuthenticationHandler';

config();

const authURL =
  `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}` || '';

const authenticationHandler = new AuthenticationHandler(authURL);
const authenticationService = new AuthenticationService(authenticationHandler);
const authenticationController = new AuthenticationController(
  authenticationService,
);

export { authenticationHandler, authenticationController };
