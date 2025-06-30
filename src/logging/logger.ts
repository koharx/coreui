import type { LogLevel, LogEntry, LoggerConfig } from './types';

export class Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];

  constructor(config: LoggerConfig = {}) {
    this.config = {
      level: 'info',
      enableConsole: true,
      enableStorage: true,
      maxEntries: 1000,
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const configLevel = this.config.level || 'info';
    return levels.indexOf(level) >= levels.indexOf(configLevel);
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);

    // Keep only the latest entries
    if (this.config.maxEntries && this.logs.length > this.config.maxEntries) {
      this.logs = this.logs.slice(-this.config.maxEntries);
    }

    // Store in localStorage if enabled
    if (this.config.enableStorage) {
      try {
        const storedLogs = localStorage.getItem('app_logs');
        const logs = storedLogs ? JSON.parse(storedLogs) : [];
        logs.push({
          ...entry,
          timestamp: entry.timestamp.toISOString(),
        });
        
        // Keep only the latest entries in storage too
        if (this.config.maxEntries && logs.length > this.config.maxEntries) {
          logs.splice(0, logs.length - this.config.maxEntries);
        }
        
        localStorage.setItem('app_logs', JSON.stringify(logs));
      } catch (error) {
        console.warn('Failed to store log in localStorage:', error);
      }
    }
  }

  log(level: LogLevel, message: string, data?: any) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
    };

    this.addLog(entry);

    if (this.config.enableConsole) {
      const consoleMethod = level === 'debug' ? 'debug' : level;
      if (data) {
        console[consoleMethod](message, data);
      } else {
        console[consoleMethod](message);
      }
    }
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: any) {
    const entry: LogEntry = {
      level: 'error',
      message,
      timestamp: new Date(),
      error,
      data,
    };

    this.addLog(entry);

    if (this.config.enableConsole) {
      if (error) {
        console.error(message, error, data);
      } else {
        console.error(message, data);
      }
    }
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    if (this.config.enableStorage) {
      localStorage.removeItem('app_logs');
    }
  }
}

export const createLogger = (config?: LoggerConfig): Logger => {
  return new Logger(config);
}; 