import { Component, computed, inject, input, output } from "@angular/core";
import { UiNotification } from "../../../core/models/ui-notification.model";
import { Store } from "@ngrx/store";
import { UiNotificationActions } from "../../../store/ui-notifications/ui-notification.actions";

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styles: [`
    .animate-slide-in {
      animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class NotificationComponent {
  notification = input.required<UiNotification>();
  close = output<string>();

  private store = inject(Store);

  onContentClick() {
    if (this.notification().redirectTo) {
      this.store.dispatch(UiNotificationActions.notificationClicked({ notification: this.notification() }));
    }
  }

  typeClasses = computed(() => {
    switch (this.notification().type) {
      case 'success': return 'bg-neutral-900/90 border-green-500/50';
      case 'error': return 'bg-neutral-900/90 border-red-500/50';
      case 'warning': return 'bg-neutral-900/90 border-amber-500/50';
      default: return 'bg-neutral-900/90 border-blue-500/50';
    }
  });

  glowColor = computed(() => {
    switch (this.notification().type) {
      case 'success': return '#22c55e';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  });
}
