import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FundService } from '../../core/services/fund.service';
import { FundActions } from '../actions/fund.actions';

@Injectable()
export class FundEffects {
  private actions$ = inject(Actions);
  private fundService = inject(FundService);

  loadFunds$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FundActions.loadFunds),
      mergeMap(() => this.fundService.getFunds()
        .pipe(
          map(funds => FundActions.loadFundsSuccess({ funds })),
          catchError((error: any) => of(FundActions.loadFundsFailure({ error: error.message })))
        )
      )
    );
  });
}
