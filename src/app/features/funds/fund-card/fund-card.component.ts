import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Fund } from '../../../core/models/fund.model';
import { CopCurrencyPipe } from '../../../core/pipes/currency-cop.pipe';

@Component({
  selector: 'app-fund-card',
  standalone: true,
  imports: [CopCurrencyPipe],
  templateUrl: './fund-card.component.html'
})
export class FundCardComponent {
  @Input({ required: true }) fund!: Fund;
  @Output() subscribe = new EventEmitter<Fund>();

  onSubscribe() {
    this.subscribe.emit(this.fund);
  }
}
