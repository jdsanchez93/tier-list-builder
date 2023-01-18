import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TierList } from '../tier-list/TierList.models';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['AllTierLists'],
    endpoints: builder => ({
        getTierLists: builder.query<TierList[], void>({
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
            query: (x: Partial<TierList>) => {
                const tierListId = x.tierListId;
                const copy = { ...x };
                delete copy.tierListId
                return ({
                    url: `/TierList/${tierListId}`,
                    method: 'PATCH',
                    body: getPatchItems(copy)
                });
            }
        }),
    })
});

export const {
    useGetTierListsQuery,
    usePostTierListMutation,
    useGetTierListByIdQuery,
    useEditTierListMutation
} = apiSlice;

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
