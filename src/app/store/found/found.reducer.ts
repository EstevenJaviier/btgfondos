import { createReducer, on } from '@ngrx/store';

import { Fund } from '../../core/models/fund.model';
import { Transaction } from '../../core/models/transaction.model';
import { FundActions } from './fund.actions';

export interface FoundState {
  funds: Fund[];
  transactions: Transaction[];
  balance: number;
  loading: boolean;
  error: string | null;
}

export const initialState: FoundState = {
  funds: [],
  transactions: [],
  balance: 500000,
  loading: false,
  error: null,
};

export const foundReducer = createReducer<FoundState>(
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
        t.id === transactionId ? { ...t, status: 'CANCEL' } : t,
      ),
    };
  }),
);
