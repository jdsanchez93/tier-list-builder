import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store<{ tierList: TierListState }>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTierList({tierListId: 2}))
  }

  drag(event: CdkDragEnd<any>, id: number) {
    const position = event.source.getFreeDragPosition();
    console.log('CdkDragEnd', position);
  }

}
