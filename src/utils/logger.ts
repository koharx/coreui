// Simple console-based logger replacement for winston

export const logError = (error: Error, context?: string) => {
  console.error({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
};

export const logInfo = (message: string, meta?: any) => {
  console.info({
    message,
    meta,
    timestamp: new Date().toISOString(),
  });
};

export const logWarning = (message: string, meta?: any) => {
  console.warn({
    message,
    meta,
    timestamp: new Date().toISOString(),
  });
}; 