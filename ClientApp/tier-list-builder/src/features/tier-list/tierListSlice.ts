import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../app/store';

// export interface TierListState {
//   status: 'idle' | 'loading' | 'failed';
//   error?: string;
// }

export interface TierList {
  tierListId: number;
  name?: string;
}

export const getAllTierListsAsync = createAsyncThunk(
  'tierList/getAll',
  async () => {
    const response = await axios.get('/api/TierList/GetAll');
    return response.data;
  }
)

const tierListAdapter = createEntityAdapter<TierList>({
  selectId: (t) => t.tierListId
});

const initialState = tierListAdapter.getInitialState({
  status: 'idle',
  error: null
})

export const tierListSlice = createSlice({
  name: 'tierList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTierListsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTierListsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        tierListAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllTierListsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default tierListSlice.reducer;

export const {
  selectAll: selectAllTierLists,
  selectById: selectAllTierListsById,
  selectIds: selectAllTierListIds
  // Pass in a selector that returns the tier list slice of state
} = tierListAdapter.getSelectors((state: RootState) => state.tierList)