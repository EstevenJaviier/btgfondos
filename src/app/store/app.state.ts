import { Fund } from '../core/models/fund.model';
import { Transaction } from '../core/models/transaction.model';

export interface AppState {
  funds: Fund[];
  transactions: Transaction[];
  balance: number;
  loading: boolean;
  error: string | null;
}

export const initialState: AppState = {
  funds: [],
  transactions: [],
  balance: 500000,
  loading: false,
  error: null
};
