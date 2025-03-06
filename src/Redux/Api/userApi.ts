import build from "next/dist/build";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        singleUser: build.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            transformResponse: (response: { data: any }) => response.data,
            providesTags: ["allUsers"]
        }),
        loginUser: build.mutation({
            query: (data) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["logIn"]
        }),
        allUsers: build.query({
            query: ({ page, limit, email }) => ({
                url: `/users?page=${page}&limit=${limit}`,
                method: "GET"
            }),
            providesTags: ["allUsers"]
        }),

        userStatusUpdate: build.mutation({
            query: ({ id, status }) => {
                return {
                    url: `/users/update-status/${id}`,
                    method: "PUT",
                    body: { status }
                }
            },
            invalidatesTags: ["allUsers"]
        })
    }),
})

export const { useLoginUserMutation, useAllUsersQuery, useUserStatusUpdateMutation, useSingleUserQuery } = userApi