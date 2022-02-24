import { createAction, props } from '@ngrx/store';
import { PositionalTierListItem, TierList } from '../tier-list-models';

export const loadTierList = createAction('[Tier List Api] Load Tier List', props<{ tierListId: number }>());
export const loadTierListSuccess = createAction('[Tier List Api] Load Tier List Success', props<{ tierList: TierList, positionalTierListItems: PositionalTierListItem[] }>());
export const loadTierListError = createAction('[Tier List Api] Load Tier List Error');


export const updateItem = createAction('[Tier List Api] Update Item', props<{itemId: number, partialItem: Partial<PositionalTierListItem>}>());
export const updateItemSuccess = createAction('[Tier List Api] Update Item Success', props<{itemId: number, partialItem: Partial<PositionalTierListItem>}>());
export const updateItemError = createAction('[Tier List Api] Update Item Error');