import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TierListService } from '../tier-list.service';
import { addItem, addItemError, addItemSuccess, deleteItem, deleteItemError, deleteItemSuccess, loadTierList, loadTierListError, loadTierListSuccess, updateItem, updateItemError, updateItemSuccess } from './tier-list.actions';

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

  addTierListItem$ = createEffect(() => this.actions$.pipe(
    ofType(addItem),
    mergeMap(action => this.tierListService.postTierListItem(action.item).pipe(
      map(i => addItemSuccess({ item: i })),
      catchError(() => [addItemError()])
    ))
  ));

  deleteTierListItem$ = createEffect(() => this.actions$.pipe(
    ofType(deleteItem),
    mergeMap(action => this.tierListService.deleteTierListItem(action.itemId).pipe(
      map(() => deleteItemSuccess({ itemId: action.itemId })),
      catchError(() => [deleteItemError()])
    ))
  ));

  constructor(
    private actions$: Actions,
    private tierListService: TierListService
  ) { }
}