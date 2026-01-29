import {NextFunction, Request, Response} from 'express';
import {ExpressServerHealth} from './express-server-health';
import {HttpStatus} from '../../../core/http-status';

export class ExpressServerHealthController {
  public serverHealth(
    _req: Request,
    res: Response<ExpressServerHealth>,
    _next: NextFunction,
  ): void {
    const response: ExpressServerHealth = {
      message: 'OK',
      upTimeInSeconds: Math.floor(process.uptime()),
      localeDateAndTime: new Date(Date.now()).toLocaleString(),
    };

    res.status(HttpStatus.success.OK).send(response);
  }
}

export const expressServerHealthController =
  new ExpressServerHealthController();
