// src/features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
export const baseApi = createApi({
    reducerPath: 'baseApi', // The key for this API in the Redux store
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://api.boffo-global.com/api/v1', // Replace with your API's base URL
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
            query: ({ id, limit, page, status }) => ({

                url: id ? `/orders?id=${id}` : `/order?limit=${limit}&page=${page}&status=${status}`,
                method: 'GET',
            }),
            providesTags: ['allOrders'],
        }),
        updateOrderStatus: build.mutation({
            query: ({ id, status }) => ({
                url: `/order/status/${id}`,
                method: 'PATCH',
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
