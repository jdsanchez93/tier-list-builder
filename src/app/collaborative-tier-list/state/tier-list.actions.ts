import { createAction, props } from '@ngrx/store';
import { PositionalTierListItem, TierList } from '../tier-list-models';

export const loadTierList = createAction('[Tier List Api] Load Tier List', props<{ tierListId: number }>());
export const loadTierListSuccess = createAction('[Tier List Api] Load Tier List Success', props<{ tierList: TierList, positionalTierListItems: PositionalTierListItem[] }>());
export const loadTierListError = createAction('[Tier List Api] Load Tier List Error');


export const updateItem = createAction('[Tier List Api] Update Item', props<{itemId: number, partialItem: Partial<PositionalTierListItem>}>());
export const updateItemSuccess = createAction('[Tier List Api] Update Item Success', props<{itemId: number, partialItem: Partial<PositionalTierListItem>}>());
export const updateItemError = createAction('[Tier List Api] Update Item Error');


export const addItem = createAction('[Tier List Api] Add Item', props<{item: PositionalTierListItem}>());
export const addItemSuccess = createAction('[Tier List Api] Add Item Success', props<{item: PositionalTierListItem}>());
export const addItemError = createAction('[Tier List Api] Add Item Error');


export const deleteItem = createAction('[Tier List Api] Delete Item', props<{itemId: number}>());
export const deleteItemSuccess = createAction('[Tier List Api] Delete Item Success', props<{itemId: number}>());
export const deleteItemError = createAction('[Tier List Api] Delete Item Error');