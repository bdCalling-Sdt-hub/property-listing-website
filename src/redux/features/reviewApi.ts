/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../base/baseApi"

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReview: builder.query({
            query: () => {
     
                return {
                    url: `/review`,
                }
            }, 
            transformResponse: (response: any) => response.data
        })
    })
})

export const { useGetReviewQuery } = reviewApi