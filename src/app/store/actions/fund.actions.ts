import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Fund } from '../../core/models/fund.model';
import { Transaction } from '../../core/models/transaction.model';

export const FundActions = createActionGroup({
  source: 'Funds',
  events: {
    'Load Funds': emptyProps(),
    'Load Funds Success': props<{ funds: Fund[] }>(),
    'Load Funds Failure': props<{ error: string }>(),
    'Subscribe Fund': props<{ transaction: Transaction }>(),
    'Cancel Fund': props<{ transactionId: number }>(),
  },
});
