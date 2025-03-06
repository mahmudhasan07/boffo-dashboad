// import { baseApi } from "@/redux/api/baseApi";

import baseApi from "./baseApi"

const couponApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addCoupon: build.mutation({
            query: (data) => ({
                url: "/coupons",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["coupon"]
        }),

        getCoupon: build.query({
            query: () => ({
                url: "/coupons",
                method: "GET",
            }),
            providesTags: ["coupon"]
        }),
        getSingleCoupon: build.query({
            query: (id) => ({
                url: `coupons/${id}`,
                method: "GET",
            }),
            providesTags: ["coupon"]
        }),

        updateCoupon: build.mutation({
            query: ({ data, id }) => ({
                url: `coupons/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["coupon"]
        }),

        deleteCoupon: build.mutation({
            query: (id) => ({
                url: `coupons/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["coupon"]
        }),

    })
})

export const { useAddCouponMutation, useGetCouponQuery, useUpdateCouponMutation, useDeleteCouponMutation, useGetSingleCouponQuery } = couponApi