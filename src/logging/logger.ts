import { LogLevel, LogEntry, LoggerConfig, Logger } from "./types";

export class LoggerImpl implements Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] ${levelName}: ${message}${contextStr}`;
  }

  private addLog(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error,
    };

    this.logs.push(logEntry);

    if (this.config.enableConsole) {
      const formattedMessage = this.formatMessage(level, message, context);
      
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(formattedMessage);
          if (error) {
            console.error(error);
          }
          break;
      }
    }

    // Keep only the latest logs if maxEntries is set
    if (this.config.maxFileSize && this.logs.length > this.config.maxFileSize) {
      this.logs = this.logs.slice(-this.config.maxFileSize);
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.addLog(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.addLog(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.addLog(LogLevel.WARN, message, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.addLog(LogLevel.ERROR, message, context, error);
  }

  fatal(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.addLog(LogLevel.FATAL, message, context, error);
  }

  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  getLevel(): LogLevel {
    return this.config.level;
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const createLogger = (config: LoggerConfig): Logger => {
  return new LoggerImpl(config);
};

export const defaultLogger = createLogger({
  level: LogLevel.INFO,
  enableConsole: true,
  enableFile: false,
}); 