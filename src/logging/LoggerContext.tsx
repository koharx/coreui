import {
  createContext,
  useContext,
  useCallback,
  useRef,
  type ReactNode,
  type FC,
} from "react";
import { Logger } from "./logger";
import type { LoggerContextType, LogLevel, LoggerConfig } from "./types";

const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

interface LoggerProviderProps {
  children: ReactNode;
  config?: LoggerConfig;
}

export const LoggerProvider: FC<LoggerProviderProps> = ({
  children,
  config,
}) => {
  const loggerRef = useRef<Logger>(new Logger(config));

  const log = useCallback((level: LogLevel, message: string, data?: any) => {
    loggerRef.current.log(level, message, data);
  }, []);

  const debug = useCallback((message: string, data?: any) => {
    loggerRef.current.debug(message, data);
  }, []);

  const info = useCallback((message: string, data?: any) => {
    loggerRef.current.info(message, data);
  }, []);

  const warn = useCallback((message: string, data?: any) => {
    loggerRef.current.warn(message, data);
  }, []);

  const error = useCallback((message: string, error?: Error, data?: any) => {
    loggerRef.current.error(message, error, data);
  }, []);

  const getLogs = useCallback((level?: LogLevel) => {
    return loggerRef.current.getLogs(level);
  }, []);

  const clearLogs = useCallback(() => {
    loggerRef.current.clearLogs();
  }, []);

  return (
    <LoggerContext.Provider
      value={{
        log,
        debug,
        info,
        warn,
        error,
        getLogs,
        clearLogs,
      }}
    >
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (context === undefined) {
    throw new Error("useLogger must be used within a LoggerProvider");
  }
  return context;
};
