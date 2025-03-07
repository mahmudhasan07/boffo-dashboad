// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://10.0.10.65:9875/api/v1', // Replace with your API's base URL
        baseUrl: 'http://localhost:4000/api/v1', // Replace with your API's base URL
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken") // Assuming token is stored in the auth slice
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        getOrders: build.query({
            query: ({ id, limit, page }) => ({
                url: id ? `/orders?id=${id}` : `/order?limit=${limit}&page=${page}`,
                method: 'GET',
            }),
            providesTags: ['allOrders'],
        }),
        updateOrderStatus: build.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['allOrders'],
        }),
    }),
    tagTypes: ["logIn", "transaction", "allUsers", "allProducts", "allOrders", "Videos", "banner", "coupon"]
});

// Export hooks for usage in functional components
export const { useGetOrdersQuery, useUpdateOrderStatusMutation } = baseApi;
export default baseApi;
