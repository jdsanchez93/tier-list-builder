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

  public patchPositionalTierListItem(id: number, partialItem: Partial<PositionalTierListItem>) {
    // TODO move this to central location
    // TODO consider fixing cast to any
    const patchObj = Object.keys(partialItem).map(key => ({
        'path': `/${key}`,
        'op': 'replace',
        'value': (partialItem as any)[key]
      })
    )
    return this.http.patch(`api/PositionalTierListItem/${id}`, patchObj);
  }

  postTierListItem(item: PositionalTierListItem): Observable<PositionalTierListItem> {
    return this.http.post<PositionalTierListItem>('api/PositionalTierListItem', item);
  }

  deleteTierListItem(itemId: number) {
    return this.http.delete<PositionalTierListItem>(`api/PositionalTierListItem/${itemId}`);
  }
}
