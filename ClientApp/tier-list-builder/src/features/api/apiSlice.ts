import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TierList } from '../tier-list/tierListSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: builder => ({
        getTierLists: builder.query<TierList[], any>({
            query: () => 'TierList/GetAll'
        })
    })
});

export const { useGetTierListsQuery } = apiSlice;