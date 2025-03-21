/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../base/baseApi";

const businessApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({ 
        getBusiness: builder.query({
            query: () => ({
                url: '/business',
            }), 
            transformResponse: (response: any) => response.data
        }) , 

        uploadBusinessList: builder.mutation({
            query: (data) => {
                return{
                    url: "/business",
                    method: "POST",
                    body: data,
                }
            }
        }) 
     }) 
}) 

export const {useGetBusinessQuery , useUploadBusinessListMutation} = businessApi