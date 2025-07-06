import React, { createContext, useContext, useState, useCallback } from "react";
import { createLogger, LoggerImpl } from "./logger";
import { LogLevel, LogEntry, LoggerConfig } from "./types";

interface LoggerContextType {
  logger: LoggerImpl;
  logs: LogEntry[];
  setLevel: (level: LogLevel) => void;
  clearLogs: () => void;
  debug: (message: string, context?: Record<string, unknown>) => void;
  info: (message: string, context?: Record<string, unknown>) => void;
  warn: (message: string, context?: Record<string, unknown>) => void;
  error: (
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ) => void;
  fatal: (
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ) => void;
}

const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

interface LoggerProviderProps {
  children: React.ReactNode;
  config?: LoggerConfig;
}

export const LoggerProvider: React.FC<LoggerProviderProps> = ({
  children,
  config = {
    level: LogLevel.INFO,
    enableConsole: true,
    enableFile: false,
  },
}) => {
  const [logger] = useState(() => createLogger(config) as LoggerImpl);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const setLevel = useCallback(
    (level: LogLevel) => {
      logger.setLevel(level);
    },
    [logger]
  );

  const clearLogs = useCallback(() => {
    logger.clearLogs();
    setLogs([]);
  }, [logger]);

  const debug = useCallback(
    (message: string, context?: Record<string, unknown>) => {
      logger.debug(message, context);
      setLogs([...logger.getLogs()]);
    },
    [logger]
  );

  const info = useCallback(
    (message: string, context?: Record<string, unknown>) => {
      logger.info(message, context);
      setLogs([...logger.getLogs()]);
    },
    [logger]
  );

  const warn = useCallback(
    (message: string, context?: Record<string, unknown>) => {
      logger.warn(message, context);
      setLogs([...logger.getLogs()]);
    },
    [logger]
  );

  const error = useCallback(
    (message: string, error?: Error, context?: Record<string, unknown>) => {
      logger.error(message, error, context);
      setLogs([...logger.getLogs()]);
    },
    [logger]
  );

  const fatal = useCallback(
    (message: string, error?: Error, context?: Record<string, unknown>) => {
      logger.fatal(message, error, context);
      setLogs([...logger.getLogs()]);
    },
    [logger]
  );

  const value = {
    logger,
    logs,
    setLevel,
    clearLogs,
    debug,
    info,
    warn,
    error,
    fatal,
  };

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
};

export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (context === undefined) {
    throw new Error("useLogger must be used within a LoggerProvider");
  }
  return context;
};
