// libs/common/src/logger/logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: any) {
    this.logger.error(`${message} - Trace: ${JSON.stringify(trace)}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug?(message: string) {
    this.logger.debug(message);
  }

  verbose?(message: string) {
    this.logger.verbose(message);
  }
}
