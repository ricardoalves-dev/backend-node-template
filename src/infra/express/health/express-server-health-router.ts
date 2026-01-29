import {Router} from 'express';
import {ExpressServerRoutes} from '../express-server-routes';
import {
  expressServerHealthController,
  ExpressServerHealthController,
} from './express-server-health-controller';

export class ExpressServerHealthRouter implements ExpressServerRoutes {
  public readonly router = Router();
  public readonly path = '/health';

  constructor(readonly controller: ExpressServerHealthController) {
    this.router.get('/', (req, res, next) => {
      controller.serverHealth(req, res, next);
    });
  }
}

export const expressServerHealthRouter = new ExpressServerHealthRouter(
  expressServerHealthController,
);
