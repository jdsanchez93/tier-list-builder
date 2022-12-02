import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TierList, TierListRow } from '../tier-list/tierListSlice';

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
        }),
        // TODO review (string | undefined)
        getTierListById: builder.query<TierList, string | undefined>({
            query: (x) => `TierList/${x}`
        }),
        editTierList: builder.mutation<TierList, Partial<TierList>>({
            query: (x: Partial<TierList>) => ({
                url: `/TierList/${x.tierListId}`,
                method: 'PATCH',
                body: getPatchItems(x)
            })
        }),
    })
});

export const { useGetTierListsQuery, usePostTierListMutation, useGetTierListByIdQuery, useEditTierListMutation } = apiSlice;

interface PatchItem {
    path: string;
    op: string;
    value: any;
}
function getPatchItems(x: any): PatchItem[] {
    return Object.keys(x).map(key => (
        {
            'path': `/${key}`,
            'op': 'replace',
            'value': (x)[key]
        })
    );
}
