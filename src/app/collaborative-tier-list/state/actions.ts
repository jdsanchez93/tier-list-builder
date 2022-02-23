import { createAction, props } from '@ngrx/store';
import { PositionalTierListItem, TierList } from '../tier-list-models';

export const loadTierList = createAction('[Tier List Api] Load Tier List', props<{ tierListId: number }>());
export const loadTierListSuccess = createAction('[Tier List Api] Load Tier List Success', props<{ tierList: TierList, positionalTierListItems: PositionalTierListItem[] }>());
export const loadTierListError = createAction('[Tier List Api] Load Tier List Error');