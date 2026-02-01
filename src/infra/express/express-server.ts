import express, {type Application} from 'express';
import {ExpressServerRoutes} from './express-server-routes';
import type {RequestHandler, ErrorRequestHandler} from 'express';
import type {Server} from 'node:http';
import {Logger} from '../../core/logger';
import {ExpressServerConfig} from './express-server-config';

export class ExpressServer {
  private expressApp: Application;
  private httpServer!: Server;
  private readonly preMiddlewares: RequestHandler[];
  private readonly postMiddlewares: RequestHandler[];
  private readonly handlers: ErrorRequestHandler[];
  private readonly routes: ExpressServerRoutes[];
  private readonly logger?: Logger;

  constructor({
    preMiddlewares,
    postMiddlewares,
    handlers,
    routes,
    logger,
  }: ExpressServerConfig) {
    this.expressApp = express();
    this.preMiddlewares = preMiddlewares;
    this.postMiddlewares = postMiddlewares;
    this.handlers = handlers;
    this.routes = routes;
    this.logger = logger;

    this.setupExpressApp();
  }

  private setupExpressApp(): void {
    this.logger?.info('Setting up application');
    this.expressApp.disable('x-powered-by');
    this.setupMiddlewares(this.preMiddlewares);
    this.setupRoutes();
    this.setupMiddlewares(this.postMiddlewares);
    this.setupHandlers();
  }

  private setupMiddlewares(middlewares: RequestHandler[]): void {
    this.logger?.info('Setting up middlewares');
    for (const middleware of middlewares) {
      this.expressApp.use(middleware);
    }
  }

  private setupRoutes(): void {
    this.logger?.info('Setting up routes');
    for (const route of this.routes) {
      this.expressApp.use(route.path, route.router);
    }
  }

  private setupHandlers(): void {
    this.logger?.info('Setting up handlers');
    for (const handler of this.handlers) {
      this.expressApp.use(handler);
    }
  }

  public start(port: number): void {
    this.httpServer = this.expressApp.listen(port, () => {
      this.logger?.info(`Server is running on port ${port}`);
    });
  }

  public async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer.close((err?: Error) => {
        if (err) {
          this.logger?.error('An error occurred while closing the server', err);
          return reject(err);
        }

        this.logger?.info('Server closed successfully');
        return resolve();
      });
    });
  }
}
