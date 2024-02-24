import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const mangaApi = createApi({
    reducerPath: 'mangaApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api/weeabApi/manga' }),
    endpoints: (builder) => ({
        seasonsNowMain: builder.query({
            query: (token) => ({
                url: '/seasons',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        mangaData: builder.query({
            query: ({ token, mediaState, pageNo }) => ({
                url: `/${mediaState}`,
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


export const { useLazySeasonsNowMainQuery, useLazyMangaDataQuery } = mangaApi;
