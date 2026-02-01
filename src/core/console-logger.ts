import {Logger} from './logger';

export class ConsoleLogger implements Logger {
  constructor(readonly loggerContext: string) {}

  private format(type: keyof Logger, message: string): string {
    return `[${type.toUpperCase()}] [${this.loggerContext}] [${new Date(Date.now()).toLocaleString()}]: ${message}`;
  }

  info(message: string): void {
    console.info(this.format('info', message));
  }

  debug(message: string): void {
    console.debug(this.format('debug', message));
  }

  error(message: string, error: Error): void {
    console.error(this.format('error', message), error);
  }

  warn(message: string): void {
    console.warn(this.format('warn', message));
  }
}
