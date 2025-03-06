import baseApi from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        setBanner: build.mutation({
            query: (data) => ({
                url: "/banners",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["banner"]
        }),
        getBanner: build.query({
            query: (data) => ({
                url: `/banners?category=${data}`,
                method: "GET"
            }),
            providesTags: ['banner']
        })
    })
})

export const { useSetBannerMutation, useGetBannerQuery } = bannerApi