import baseApi from "./baseApi";

const videoApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        Video: build.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Videos"]
        }),
        getVideo: build.query({
            query: (id) => ({
                url: id ? `/videos/${id}` : "/videos",
                method: "GET",
            }),
            providesTags: ["Videos"]
        }),
        updateVideo: build.mutation({
            query: ({ data, id }) => ({
                url: `/videos/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Videos"]
        }),
        deleteVideo: build.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Videos"]
        }),
    }),
})


export const { useGetVideoQuery, useVideoMutation, useUpdateVideoMutation, useDeleteVideoMutation } = videoApi