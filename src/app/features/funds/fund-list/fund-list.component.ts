import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FundCardComponent } from '../fund-card/fund-card.component';
import { FundActions } from '../../../store/actions/fund.actions';
import { selectFunds, selectLoading, selectError, selectBalance } from '../../../store/selectors/fund.selectors';
import { CopCurrencyPipe } from '../../../core/pipes/currency-cop.pipe';
import { Fund } from '../../../core/models/fund.model';
import { AsyncPipe } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { SubscribeFormComponent } from '../../subscribe/subscribe-form/subscribe-form.component';

@Component({
  selector: 'app-fund-list',
  standalone: true,
  imports: [FundCardComponent, CopCurrencyPipe, AsyncPipe, DialogModule],
  templateUrl: './fund-list.component.html'
})
export class FundListComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(Dialog);

  funds$ = this.store.select(selectFunds);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  balance$ = this.store.select(selectBalance);

  ngOnInit() {
    this.store.dispatch(FundActions.loadFunds());
  }

  onSubscribe(fund: Fund) {
    this.dialog.open(SubscribeFormComponent, {
      minWidth: '350px',
      data: { fundId: fund.id }
    });
  }
}
