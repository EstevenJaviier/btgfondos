import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Fund } from '../../../core/models/fund.model';
import { CopCurrencyPipe } from '../../../core/pipes/currency-cop.pipe';
import { DIALOG_DATA, DialogRef, DialogModule } from '@angular/cdk/dialog';
import { NgClass } from '@angular/common';
import { selectFunds, selectBalance } from '../../../store/found/fund.selectors';
import { FundActions } from '../../../store/found/fund.actions';

@Component({
  selector: 'app-subscribe-form',
  standalone: true,
  imports: [ReactiveFormsModule, CopCurrencyPipe, DialogModule, NgClass],
  templateUrl: './subscribe-form.component.html'
})
export class SubscribeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialogRef = inject(DialogRef<void>);
  public data: { fundId: number } = inject(DIALOG_DATA);

  fund: Fund | undefined;
  userBalance = 0;
  
  subscribeForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required]],
    notification: ['EMAIL', Validators.required]
  });

  ngOnInit() {
    const fundId = this.data.fundId;

    this.store.select(selectBalance).pipe(take(1)).subscribe(balance => {
      this.userBalance = balance;
    });

    this.store.select(selectFunds).pipe(take(1)).subscribe(funds => {
      this.fund = funds.find(f => f.id === fundId);
      if (this.fund) {
        this.subscribeForm.get('amount')?.setValidators([
          Validators.required,
          Validators.min(this.fund.minimumAmount),
          Validators.max(this.userBalance)
        ]);
        this.subscribeForm.get('amount')?.updateValueAndValidity();
      } else {
        this.dialogRef.close();
      }
    });
  }

  hasError(controlName: string) {
    const control = this.subscribeForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  onSubmit() {
    if (this.subscribeForm.valid && this.fund) {
      const formValue = this.subscribeForm.value;
      
      const transaction = {
        id: new Date().getTime(),
        fundId: this.fund.id,
        status: 'SUBSCRIBE' as const,
        amount: formValue.amount,
        date: new Date(),
        notificationType: formValue.notification
      };

      this.store.dispatch(FundActions.subscribeFund({ transaction }));
      this.dialogRef.close();
    }
  }

  goBack() {
    this.dialogRef.close();
  }
}
