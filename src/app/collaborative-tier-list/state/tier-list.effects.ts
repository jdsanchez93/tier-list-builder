import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TierListService } from '../tier-list.service';
import { loadTierList, loadTierListSuccess } from './actions';

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
        catchError(() => EMPTY)
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private tierListService: TierListService
  ) { }
}