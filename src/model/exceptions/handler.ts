import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const asyncHandler =
  (
    fn: (
      arg0: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      arg1: Response<any, Record<string, any>>,
      arg2: NextFunction,
    ) => any,
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const errorResponse = (
  err: {
    constructor: { name: string };
    statusCode: any;
    message: any;
    cause: any;
  },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const customError = !(
    err.constructor.name === 'NodeError' ||
    err.constructor.name === 'SyntaxError'
  );

  res.status(err.statusCode || 500).json({
    response: 'Error',
    error: {
      type: customError === false ? 'UnhandledError' : err.constructor.name,
      path: req.path,
      statusCode: err.statusCode || 500,
      message: err.message,
      cause: err.cause,
    },
  });

  next(err);
};

// se n me engano, n está funcional ainda, não arrumei sipa
export const errorLogging = (
  err: {
    constructor: { name: string };
    statusCode: any;
    cause: any;
    stack: any;
  },
  req: Request,
  next: NextFunction,
) => {
  const customError = !(
    err.constructor.name === 'NodeError' ||
    err.constructor.name === 'SyntaxError'
  );

  // console.log('ERROR');
  // console.log(`Type: ${customError ? 'UnhandledError' : err.constructor.name}`);
  // console.log('Path: ' + req.path);
  // console.log(`Status code: ${err.statusCode || 500}`);
  // console.log(err.cause);
  // console.log(err.stack);

  next();
};
