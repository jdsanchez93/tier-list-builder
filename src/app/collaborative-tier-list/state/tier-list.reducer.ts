import { createReducer, on } from '@ngrx/store';
import * as TierListActions from './tier-list.actions';
import { PositionalTierListItem, TierList } from '../tier-list-models';

export const tierListFeatureKey = 'tierList';

export interface TierListState {
  tierList: TierList,
  items: PositionalTierListItem[]
}

export const initialState: TierListState = {
  tierList: {
    tierListId: 0,
    name: '',
    tierListRows: []
  },
  items: []
}

export const tierListReducer = createReducer(
  initialState,
  on(TierListActions.loadTierListSuccess, (state, { tierList, positionalTierListItems }) => ({
    tierList: tierList,
    items: positionalTierListItems
  })),
  on(TierListActions.updateItemSuccess, (state, { itemId, partialItem }) => {
    const updatedItems = state.items.map(i => {
      if (i.positionalTierListItemId === itemId) {
        return { ...i, ...partialItem }
      }
      return i;
    });
    return { ...state, items: updatedItems };
  }),
  on(TierListActions.addItemSuccess, (state, { item }) => {
    return { ...state, items: [...state.items, item] };
  }),
  on(TierListActions.deleteItemSuccess, (state, { itemId }) => {
    return { ...state, items: state.items.filter(i => i.positionalTierListItemId !== itemId) };
  })
);