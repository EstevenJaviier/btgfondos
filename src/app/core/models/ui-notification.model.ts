export interface UiNotification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  title?: string;
  redirectTo?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';
