import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { loadTierList } from '../state/actions';
import { TierListState } from '../state/reducers';
import { PositionalTierListItem, TierListRow } from '../tier-list-models';

@Component({
  selector: 'app-collaborative-tier-list',
  templateUrl: './collaborative-tier-list.component.html',
  styleUrls: ['./collaborative-tier-list.component.scss']
})
export class CollaborativeTierListComponent implements OnInit {

  tierListItems$: Observable<PositionalTierListItem[]> = this.store.select(state => state.tierList.items);
  tierListRows$: Observable<TierListRow[]> = this.store.select(state => {
    console.log(state)
    return state.tierList.tierList.tierListRows
  });

  constructor(
    private store: Store<{ tierList: TierListState }>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const idParam = params.get('id');
        const id = idParam === null ? -1 : +idParam;
        return of(id);
      }),
      tap(id => this.store.dispatch(loadTierList({ tierListId: id })))
    ).subscribe();

  }

  drag(event: CdkDragEnd<any>, id: number) {
    const position = event.source.getFreeDragPosition();
    console.log('CdkDragEnd', position);
  }

}
