import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PositionalTierListItem, TierList } from './tier-list-models';

@Injectable({
  providedIn: 'root'
})
export class TierListService {

  constructor(private http: HttpClient) { }

  public getTierList(id: number): Observable<TierList> {
    return this.http.get<TierList>(`api/TierList/${id}`);
  }

  public getPositionalTierListItems(id: number): Observable<PositionalTierListItem[]> {
    return this.http.get<PositionalTierListItem[]>(`api/TierList/GetPositionalTierListItems/${id}`);
  }
}
