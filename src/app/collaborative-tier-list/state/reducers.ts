import { createReducer, on } from '@ngrx/store';
import * as TierListActions from './actions';
import { PositionalTierListItem, TierList } from '../tier-list-models';

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
    on(TierListActions.loadTierListSuccess, (state, { tierList, positionalTierListItems }) => ({ tierList: tierList, items: positionalTierListItems }))
);