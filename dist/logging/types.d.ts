export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    data?: any;
    error?: Error;
}
export interface LoggerConfig {
    level?: LogLevel;
    enableConsole?: boolean;
    enableStorage?: boolean;
    maxEntries?: number;
}
export interface LoggerContextType {
    log: (level: LogLevel, message: string, data?: any) => void;
    debug: (message: string, data?: any) => void;
    info: (message: string, data?: any) => void;
    warn: (message: string, data?: any) => void;
    error: (message: string, error?: Error, data?: any) => void;
    getLogs: (level?: LogLevel) => LogEntry[];
    clearLogs: () => void;
}
