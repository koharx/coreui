import type { LogLevel, LogEntry, LoggerConfig } from './types';
export declare class Logger {
    private config;
    private logs;
    constructor(config?: LoggerConfig);
    private shouldLog;
    private addLog;
    log(level: LogLevel, message: string, data?: any): void;
    debug(message: string, data?: any): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, error?: Error, data?: any): void;
    getLogs(level?: LogLevel): LogEntry[];
    clearLogs(): void;
}
export declare const createLogger: (config?: LoggerConfig) => Logger;
