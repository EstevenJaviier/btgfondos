import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UiNotificationActions } from './ui-notification.actions';
import { mergeMap, of, delay, map } from 'rxjs';

@Injectable()
export class UiNotificationEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  autoDismiss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiNotificationActions.addNotification),
      mergeMap(({ notification }) => {
        const id = notification.id || '';
        const duration = notification.duration || 3000;
        return of(id).pipe(
          delay(duration),
          map(() => UiNotificationActions.removeNotification({ id }))
        )
      })
    )
  );

  notificationClicked$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UiNotificationActions.notificationClicked),
      mergeMap(({ notification }) => {
        if (notification.redirectTo) {
          this.router.navigate([notification.redirectTo]);
        }
        return of(UiNotificationActions.removeNotification({ id: notification.id }));
      })
    ),
    { dispatch: false }
  );
}
