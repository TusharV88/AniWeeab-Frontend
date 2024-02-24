import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const searchMediaApi = createApi({
    reducerPath: 'searchMediaApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api/weeabApi/search' }),
    endpoints: (builder) => ({
        searchMedia: builder.query({
            query: ({ token, mediaTypeState, query, pageNo }) => ({
                url: `/${mediaTypeState}/${query}`,
                method: 'GET',
                params: { pageNo },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        })
    })
});


export const { useLazySearchMediaQuery } = searchMediaApi;