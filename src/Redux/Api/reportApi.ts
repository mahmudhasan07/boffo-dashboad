import build from "next/dist/build";
import baseApi from "./baseApi";

const reportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllReports: build.query({
            query: () => ({
                url: "/reports",
                method: "GET"
            })
        })
    })
})

export const { useGetAllReportsQuery } = reportApi 