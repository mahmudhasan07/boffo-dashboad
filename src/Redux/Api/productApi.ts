import baseApi from "./baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addProduct: build.mutation({
            query: (data) => ({
                url: "/product/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["allProducts"]
        }),
        allProducts: build.query({
            query: () => ({
                url: `/product`,
                method: "GET"
            }),
            providesTags: ["allProducts"]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["allProducts"]
        }),
        singleProduct: build.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: "GET"
            }),
            providesTags: ["allProducts"]
        }),
        updateProduct: build.mutation({
            query: ({ id, data }) => ({
                url: `/product/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["allProducts"]
        }),
        orderHistory: build.query({
            query: (status) => ({
                url: `/orders`,
                method: "GET"
            }),
            providesTags: ["allOrders"]
        }),
        orderStatus: build.mutation({
            query: ({ id, status }) => ({
                url: `/order/status/${id}`,
                method: "PATCH",
                body: status
            }),
            invalidatesTags: ["allOrders"]
        }),
        updateFeatures: build.mutation({
            query: ({ id, features }) => (
                {
                    url: `/product/isFeature/${id}`,
                    method: "PATCH",
                    body: { isFeatured: features }
                }),
            invalidatesTags: ['allProducts']
        })
    })
})

export const { useAddProductMutation, useAllProductsQuery, useDeleteProductMutation, useSingleProductQuery, useUpdateProductMutation, useOrderHistoryQuery, useOrderStatusMutation, useUpdateFeaturesMutation } = productApi

