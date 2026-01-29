import helmet from 'helmet';
import compression from 'compression';
import {ExpressServer} from './infra/express/express-server';
import {json} from 'express';
import {expressServerHealthRouter} from './infra/express/health/express-server-health-router';
import {responseWrapperMiddleware} from './infra/express/middlewares/response-wrapper-middleware';
import {serverHandler} from './infra/express/handlers/server-handler';
import {loadEnvFile} from 'process';

(() => {
  loadEnvFile();
  const express = new ExpressServer({
    preMiddlewares: [
      helmet(),
      compression(),
      json(),
      responseWrapperMiddleware,
    ],
    postMiddlewares: [],
    handlers: [serverHandler],
    routes: [expressServerHealthRouter],
  });

  express.start(parseInt(process.env.PORT || '8080'));
})();
