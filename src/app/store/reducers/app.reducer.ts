import { createReducer, on } from '@ngrx/store';
import { AppState, initialState } from '../app.state';
import { FundActions } from '../actions/fund.actions';

export const appReducer = createReducer<AppState>(
  initialState,
  on(FundActions.loadFunds, (state) => ({ ...state, loading: true, error: null })),
  on(FundActions.loadFundsSuccess, (state, { funds }) => ({ ...state, funds, loading: false })),
  on(FundActions.loadFundsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(FundActions.subscribeFund, (state, { transaction }) => ({
    ...state,
    balance: state.balance - transaction.amount,
    transactions: [transaction, ...state.transactions],
  })),
  on(FundActions.cancelFund, (state, { transactionId }) => {
    const transaction = state.transactions.find((t) => t.id === transactionId);
    if (!transaction) return state;

    return {
      ...state,
      balance: state.balance + transaction.amount,
      transactions: state.transactions.map((t) =>
        t.id === transactionId ? { ...t, type: 'CANCEL' } : t,
      ),
    };
  }),
);
