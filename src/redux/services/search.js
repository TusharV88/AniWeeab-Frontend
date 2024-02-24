import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = JSON.stringify(import.meta.env.VITE_API_URL);

export const searchMediaApi = createApi({
    reducerPath: 'searchMediaApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/api/weeabApi/search' }),
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