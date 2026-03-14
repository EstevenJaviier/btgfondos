import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UiNotificationActions } from "../../store/ui-notifications/ui-notification.actions";
import { NotificationType } from "../models/ui-notification.model";

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private store = inject(Store);

  show(message: string, type: NotificationType = 'info', duration: number = 2000, title?: string, redirectTo?: string) {
    const id = Math.random().toString(36).substring(2, 9);
    this.store.dispatch(UiNotificationActions.addNotification({
      notification: { id, message, type, duration, title, redirectTo }
    }));
    return id;
  }

  success(message: string, duration?: number, title?: string, redirectTo?: string) {
    return this.show(message, 'success', duration, title, redirectTo);
  }

  error(message: string, duration?: number, title?: string, redirectTo?: string) {
    return this.show(message, 'error', duration, title, redirectTo);
  }

  info(message: string, duration?: number, title?: string, redirectTo?: string) {
    return this.show(message, 'info', duration, title, redirectTo);
  }

  warning(message: string, duration?: number, title?: string, redirectTo?: string) {
    return this.show(message, 'warning', duration, title, redirectTo);
  }
}
