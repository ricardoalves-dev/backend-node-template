import type {RequestHandler, ErrorRequestHandler} from 'express';
import type {ExpressServerRoutes} from './express-server-routes';
import type {Logger} from '../../core/logger';

export interface ExpressServerConfig {
  preMiddlewares: RequestHandler[];
  postMiddlewares: RequestHandler[];
  handlers: ErrorRequestHandler[];
  routes: ExpressServerRoutes[];
  logger?: Logger;
}
