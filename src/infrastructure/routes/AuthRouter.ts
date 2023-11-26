import { Router, Request, Response } from 'express';
import { authenticationController } from 'src/configs/AuthenticationContext';
import { asyncHandler } from '../../model/exceptions/handler';

const router = Router();

router.route('/auth').post(
  asyncHandler((request: Request, response: Response) => {
    return authenticationController.login(request, response);
  }),
);

export default router;
