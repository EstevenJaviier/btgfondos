import { Pipe } from '@angular/core';

@Pipe({
  name: 'copCurrency',
  standalone: true
})
export class CopCurrencyPipe {
  transform(value: number | null | undefined) {
    if (value == null) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  }
}
