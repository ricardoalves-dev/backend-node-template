import {Request, Response, NextFunction} from 'express';
import {ApiResponse} from '../../../core/api-response';

/**
 * Middleware para padronizacao da resposta da API no formato { data: T, numberOfRecords: number }
 */
export const responseWrapperMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json.bind(res);

  res.json = (body): Response => {
    if (body instanceof ApiResponse) {
      return originalJson(body);
    }

    const wrapper = new ApiResponse();
    wrapper.data = body;

    return originalJson(wrapper);
  };

  next();
};
