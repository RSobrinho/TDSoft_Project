/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Response, Request } from 'express';

import { AuthenticationService } from 'src/application/AuthenticationService';
import { AuthenticationReqValidation } from 'src/model/validations/AuthenticationValidation';

export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    await AuthenticationReqValidation.validateAsync(body);

    const data = await this.authenticationService.login(body);

    return res
      .status(200)
      .json({ msg: 'Successfully authenticated!', token: data.accessToken });
  }
}
