import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllNotifications } from '../../../store/ui-notifications/ui-notification.selectors';
import { UiNotificationActions } from '../../../store/ui-notifications/ui-notification.actions';
import { NotificationComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  template: `
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      @for (notification of notifications(); track notification.id) {
        <div class="pointer-events-auto">
          <app-notification [notification]="notification" (close)="onClose($event)" />
        </div>
      }
    </div>
  `,
})
export class NotificationContainerComponent {
  private store = inject(Store);
  notifications = this.store.selectSignal(selectAllNotifications);

  onClose(id: string) {
    this.store.dispatch(UiNotificationActions.removeNotification({ id }));
  }
}
