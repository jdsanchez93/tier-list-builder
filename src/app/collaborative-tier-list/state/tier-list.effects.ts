import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, delay, take, tap } from 'rxjs/operators';
import { TierListService } from '../tier-list.service';
import { loadTierList, loadTierListError, loadTierListSuccess, updateItem, updateItemError, updateItemSuccess } from './actions';

@Injectable()
export class TierListEffects {

  getTierList$ = createEffect(() => this.actions$.pipe(
    ofType(loadTierList),
    mergeMap(action =>
      forkJoin({
        tierList: this.tierListService.getTierList(action.tierListId),
        tierListItems: this.tierListService.getPositionalTierListItems(action.tierListId)
      }).pipe(
        map(x => (loadTierListSuccess({ tierList: x.tierList, positionalTierListItems: x.tierListItems }))),
        catchError(() => [loadTierListError()])
      )
    )
  ));

  updateTierListItem$ = createEffect(() => this.actions$.pipe(
    ofType(updateItem),
    mergeMap(action => this.tierListService.patchPositionalTierListItem(action.itemId, action.partialItem).pipe(
      map(() => updateItemSuccess({ itemId: action.itemId, partialItem: action.partialItem })),
      catchError(() => [updateItemError()])
    ))
  ));

  constructor(
    private actions$: Actions,
    private tierListService: TierListService
  ) { }
}