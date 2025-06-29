export type AlertType = 'success' | 'error' | 'warning' | 'info';
export interface Alert {
    id: string;
    type: AlertType;
    title: string;
    message: string;
    duration?: number;
    dismissible?: boolean;
    timestamp: Date;
}
export interface AlertContextType {
    alerts: Alert[];
    showAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => string;
    showSuccess: (title: string, message?: string, options?: Partial<Alert>) => string;
    showError: (title: string, message?: string, options?: Partial<Alert>) => string;
    showWarning: (title: string, message?: string, options?: Partial<Alert>) => string;
    showInfo: (title: string, message?: string, options?: Partial<Alert>) => string;
    dismissAlert: (id: string) => void;
    clearAlerts: () => void;
}
export interface AlertProviderProps {
    children: React.ReactNode;
    maxAlerts?: number;
    defaultDuration?: number;
}
