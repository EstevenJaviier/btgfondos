import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { FundService } from '../../core/services/fund.service';
import { FundActions } from './fund.actions';
import { NotifyService } from '../../core/services/notify.service';

@Injectable()
export class FundEffects {
  private actions$ = inject(Actions);
  private fundService = inject(FundService);
  private notifyService = inject(NotifyService);

  loadFunds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FundActions.loadFunds),
      mergeMap(() =>
        this.fundService.getFunds().pipe(
          map((funds) => FundActions.loadFundsSuccess({ funds })),
          catchError((error: any) => of(FundActions.loadFundsFailure({ error: error.message }))),
        ),
      ),
    );
  });

  successNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FundActions.subscribeFund, FundActions.cancelFund),
        tap((action) => {
          let message = '';
          if (action.type === FundActions.subscribeFund.type) message = 'Suscripción creada con éxito';
          if (action.type === FundActions.cancelFund.type) message = 'Suscripción cancelada con éxito';
          this.notifyService.success(message);
        }),
      ),
    { dispatch: false },
  );

  errorNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FundActions.loadFundsFailure),
        tap(({ error }) => this.notifyService.error(error)),
      ),
    { dispatch: false },
  );
}
