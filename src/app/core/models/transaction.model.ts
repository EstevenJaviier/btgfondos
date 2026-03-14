export interface Transaction {
  id: number;
  fundId: number;
  type: 'SUBSCRIBE' | 'CANCEL';
  amount: number;
  date: Date;
  notificationType: 'SMS' | 'EMAIL';
}
