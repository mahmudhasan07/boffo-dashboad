import baseApi from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: `category`,
                method: 'GET',
            }),
        }),

        addCategory: builder.mutation({
            query: (data) => ({
                url: `/category/create`,
                method: "POST",
                body: data
            }),
        }),
    }),
})

export const {useGetCategoriesQuery, useAddCategoryMutation} = categoryApi