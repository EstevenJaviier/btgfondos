import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectFunds = createSelector(
  selectAppState,
  (state: AppState) => state.funds
);

export const selectTransactions = createSelector(
  selectAppState,
  (state: AppState) => state.transactions
);

export const selectBalance = createSelector(
  selectAppState,
  (state: AppState) => state.balance
);

export const selectLoading = createSelector(
  selectAppState,
  (state: AppState) => state.loading
);

export const selectError = createSelector(
  selectAppState,
  (state: AppState) => state.error
);
