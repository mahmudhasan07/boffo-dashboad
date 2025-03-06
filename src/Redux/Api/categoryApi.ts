import baseApi from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: `category`,
                method: 'GET',
            }),
        }),
    }),
})

export const {useGetCategoriesQuery} = categoryApi