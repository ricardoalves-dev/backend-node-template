import {HttpStatus} from './http-status';

type ClientErrorKeys = keyof typeof HttpStatus.clientError;
type ServerErrorKeys = keyof typeof HttpStatus.serverError;
type ClientErrorStatus = (typeof HttpStatus.clientError)[ClientErrorKeys];
type ServerErrorStatus = (typeof HttpStatus.serverError)[ServerErrorKeys];
type ApiErrorStatus = ClientErrorStatus | ServerErrorStatus;

export abstract class ApiError extends Error {
  constructor(
    readonly status: ApiErrorStatus,
    message: string,
  ) {
    super(message);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.clientError.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.clientError.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.clientError.FORBIDDEN, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.clientError.NOT_FOUND, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.clientError.CONFLICT, message);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.clientError.TOO_MANY_REQUESTS, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(HttpStatus.serverError.INTERNAL_SERVER_ERROR, message);
  }
}
