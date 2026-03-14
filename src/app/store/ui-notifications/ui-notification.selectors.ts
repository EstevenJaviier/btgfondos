import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiNotificationState } from './ui-notification.reducer';

export const selectUiNotificationState = createFeatureSelector<UiNotificationState>('uiNotification');

export const selectAllNotifications = createSelector(
  selectUiNotificationState,
  (state) => state.notifications
);
