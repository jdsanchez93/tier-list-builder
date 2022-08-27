import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TierList } from '../tier-list-models';
import { tierListFeatureKey, TierListState } from './tier-list.reducer';


export const selectTierListFeature = createFeatureSelector<TierListState>(tierListFeatureKey);
export const selectTierListRows = createSelector(
  selectTierListFeature,
  state => state.tierList.tierListRows
);
export const selectTierListItems = createSelector(
  selectTierListFeature,
  state => state.items
)