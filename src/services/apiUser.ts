import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import type {
    IAdminUserItem, ISearchResult, IUserSearchParams, IUserUpdateModel
} from "./types.ts";
import {serialize} from "object-to-formdata";
// @ts-ignore
export const apiUser = createApi({
    reducerPath: 'api/Users',
    baseQuery: createBaseQuery('Users'),
    tagTypes: ['User','Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IAdminUserItem[], void>({
            query: () => 'list',
            providesTags: ['User'],
        }),
        searchUsers: builder.query<ISearchResult<IAdminUserItem>, IUserSearchParams>({
            query: (params) => ({
                url: 'search',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map((u: IAdminUserItem) => ({ type: 'User' as const, id: u.id })),
                        { type: 'User', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'User', id: 'PARTIAL-LIST' }],
        }),

        updateUser: builder.mutation<IAdminUserItem, IUserUpdateModel>({
            query: (data) => {
                const formData = serialize(data);
                return {
                    url: 'update',
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: (_result,_error, arg) => [
                { type: 'User', id: arg.id },
                { type: 'User', id: 'PARTIAL-LIST' },
            ],
        }),


        getUserById: builder.query<IAdminUserItem, number>({
            query: (id) => `${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),

    }),
});


export const {
    useGetAllUsersQuery,
    useSearchUsersQuery,
    useUpdateUserMutation,
    useGetUserByIdQuery
} = apiUser;