import { Injectable, LoggerService, LogLevel, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLogger implements LoggerService {
  private logger = new Logger(AppLogger.name);

  constructor(private configService: ConfigService) {}

  log(message: any, context?: string) {
    this.logger.log(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.error(message, trace, context);
    } else {
      this.logger.error(message, context);
    }
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: any, context?: string) {
    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.debug(message, context);
    }
  }

  verbose(message: any, context?: string) {
    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.verbose(message, context);
    }
  }

  setLogLevels(levels: LogLevel[]) {
    // Logger.setLogLevels is static method - commenting out as it may not be available
    // Logger.setLogLevels(levels);
  }
}
