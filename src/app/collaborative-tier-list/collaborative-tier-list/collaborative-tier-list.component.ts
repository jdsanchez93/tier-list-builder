import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { loadTierList, updateItem } from '../state/actions';
import { selectTierListRows, selectTierListItems } from '../state/tier-list.selectors';
import { PositionalTierListItem, TierListRow } from '../tier-list-models';

@Component({
  selector: 'app-collaborative-tier-list',
  templateUrl: './collaborative-tier-list.component.html',
  styleUrls: ['./collaborative-tier-list.component.scss']
})
export class CollaborativeTierListComponent implements OnInit {

  tierListItems$: Observable<PositionalTierListItem[]> = this.store.select(selectTierListItems);
  tierListRows$: Observable<TierListRow[]> = this.store.select(selectTierListRows);

  constructor(
    private store: Store,
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

  //TODO move this to new component
  drag(event: CdkDragEnd<any>, id: number) {
    const position = event.source.getFreeDragPosition();

    const partialItem: Partial<PositionalTierListItem> = {
      positionX: Math.trunc(position.x),
      positionY: Math.trunc(position.y)
    };

    this.store.dispatch(updateItem({ itemId: id, partialItem: partialItem }));
  }

}
