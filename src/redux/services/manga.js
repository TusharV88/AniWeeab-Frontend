import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = JSON.stringify(import.meta.env.VITE_API_URL);

export const mangaApi = createApi({
    reducerPath: 'mangaApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/api/weeabApi/manga' }),
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
