import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../../../core/api-error';
import {HttpStatus} from '../../../core/http-status';

export const serverHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    res.status(err.status).send(err.message);
  } else if (err instanceof Error) {
    console.log('aqui');
    res.status(HttpStatus.clientError.BAD_REQUEST).send(err.message);
  } else {
    res.status(HttpStatus.serverError.INTERNAL_SERVER_ERROR).send(String(err));
  }
};
