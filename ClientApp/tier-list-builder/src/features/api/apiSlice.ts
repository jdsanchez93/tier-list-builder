import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TierList } from '../tier-list/tierListSlice';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['AllTierLists'],
    endpoints: builder => ({
        getTierLists: builder.query<TierList[], any>({
            query: () => 'TierList/GetAll',
            providesTags: ['AllTierLists']
        }),
        postTierList: builder.mutation<TierList, Partial<TierList>>({
            query: (x: Partial<TierList>) => ({
                url: '/TierList',
                method: 'POST',
                body: x
            }),
            invalidatesTags: ['AllTierLists']
        })
    })
});

export const { useGetTierListsQuery, usePostTierListMutation } = apiSlice;