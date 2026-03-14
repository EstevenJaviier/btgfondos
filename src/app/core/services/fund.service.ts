import { HttpClient } from '@angular/common/http';
import { Fund } from '../models/fund.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FundService {
  constructor(private http: HttpClient) {}

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>('/mocks/funds.json');
  }
}
