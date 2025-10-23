import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategoryCreate, ICategoryDelete, ICategoryEdit, ICategoryItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";


export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery('categories'),
    tagTypes: ['Categories','Category'],
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem[], void>({
            query: () => '',
            providesTags: ['Category'],
        }),

        createCategory: builder.mutation<ICategoryItem, ICategoryCreate>({
            query: (newCategory) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: '',
                        method: 'POST',
                        body: formData
                    }
                }
                catch {
                    throw new Error('Error create category');
                }
            },
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation<ICategoryItem, ICategoryEdit>({
            query: (newCategory) => {
                try {
                    const formData = serialize(newCategory);
                    return {
                        url: '',
                        method: 'PUT',
                        body: formData,
                    };
                } catch {
                    throw new Error('Error edit category');
                }
            },
            invalidatesTags: ['Category','Categories'],
        }),


        getCategoryById: builder.query<ICategoryItem, number>({
            query: (id) => `${id}`,
            providesTags: ['Category'],
        }),

        deleteCategoryById: builder.mutation<ICategoryDelete, number>({
            query: (id) => {
                return {
                    url: `${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ['Category','Categories'],
        }),
    }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation,useUpdateCategoryMutation,useGetCategoryByIdQuery,useDeleteCategoryByIdMutation} = apiCategory;