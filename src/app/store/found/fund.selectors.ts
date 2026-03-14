import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoundState } from './found.reducer';

export const selectAppState = createFeatureSelector<FoundState>('found');

export const selectFunds = createSelector(
  selectAppState,
  (state: FoundState) => state.funds
);

export const selectTransactions = createSelector(
  selectAppState,
  (state: FoundState) => state.transactions
);

export const selectBalance = createSelector(
  selectAppState,
  (state: FoundState) => state.balance
);

export const selectLoading = createSelector(
  selectAppState,
  (state: FoundState) => state.loading
);

export const selectError = createSelector(
  selectAppState,
  (state: FoundState) => state.error
);
