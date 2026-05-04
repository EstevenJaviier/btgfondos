import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationContainerComponent } from './shared/components/notification-container/notification-container.component';
import { Store } from '@ngrx/store';
import { selectBalance } from './store/found/fund.selectors';
import { CopCurrencyPipe } from './core/pipes/currency-cop.pipe';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NotificationContainerComponent, CopCurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private store = inject(Store);

  protected readonly balance = this.store.selectSignal(selectBalance);
}
