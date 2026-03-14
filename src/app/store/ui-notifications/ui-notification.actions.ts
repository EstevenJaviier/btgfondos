import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UiNotification } from '../../core/models/ui-notification.model';

export const UiNotificationActions = createActionGroup({
  source: 'UiNotification',
  events: {
    'Add Notification': props<{ notification: Omit<UiNotification, 'id'> & { id?: string } }>(),
    'Remove Notification': props<{ id: string }>(),
    'Clear All Notifications': emptyProps(),
    'Notification Clicked': props<{ notification: UiNotification }>(),
  },
});
