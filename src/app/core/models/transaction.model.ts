export interface Transaction {
  id: number;
  fundId: number;
  status: 'SUBSCRIBE' | 'CANCEL';
  amount: number;
  date: Date;
  notificationType: 'SMS' | 'EMAIL';
}
