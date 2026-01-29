import {Router} from 'express';

export interface ExpressServerRoutes {
  router: Router;
  path: string;
}
