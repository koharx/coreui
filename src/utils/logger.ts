import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const logError = (error: Error, context?: string) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
};

export const logInfo = (message: string, meta?: any) => {
  logger.info({
    message,
    meta,
    timestamp: new Date().toISOString(),
  });
};

export const logWarning = (message: string, meta?: any) => {
  logger.warn({
    message,
    meta,
    timestamp: new Date().toISOString(),
  });
};

export default logger; 