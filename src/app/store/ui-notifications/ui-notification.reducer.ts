import { createReducer, on } from '@ngrx/store';
import { UiNotificationActions } from './ui-notification.actions';
import { UiNotification } from '../../core/models/ui-notification.model';

export interface UiNotificationState {
  notifications: UiNotification[];
}

export const initialState: UiNotificationState = {
  notifications: [],
};

export const uiNotificationReducer = createReducer(
  initialState,
  on(UiNotificationActions.addNotification, (state, { notification }) => ({
    ...state,
    notifications: [
      ...state.notifications,
      {
        ...notification,
        id: notification.id || Math.random().toString(36).substring(2, 9),
      },
    ],
  })),
  on(UiNotificationActions.removeNotification, (state, { id }) => ({
    ...state,
    notifications: state.notifications.filter((n) => n.id !== id),
  })),
  on(UiNotificationActions.clearAllNotifications, () => initialState),
);
