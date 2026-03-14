import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CopCurrencyPipe } from '../../../core/pipes/currency-cop.pipe';
import { FundActions } from '../../../store/found/fund.actions';
import { selectTransactions } from '../../../store/found/fund.selectors';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, CopCurrencyPipe],
  templateUrl: './transaction-history.component.html'
})
export class TransactionHistoryComponent {
  private store = inject(Store);
  transactions$ = this.store.select(selectTransactions);

  onCancel(transactionId: number) {
    this.store.dispatch(FundActions.cancelFund({ transactionId }));
  }
}
