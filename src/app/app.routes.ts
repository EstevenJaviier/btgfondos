import { Routes } from '@angular/router';
import { FundListComponent } from './features/funds/fund-list/fund-list.component';
import { TransactionHistoryComponent } from './features/transactions/transaction-history/transaction-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'funds', pathMatch: 'full' },
  { path: 'funds', component: FundListComponent },
  { path: 'transactions', component: TransactionHistoryComponent },
  { path: '**', redirectTo: 'funds' }
];

