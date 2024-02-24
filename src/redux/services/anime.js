import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = JSON.stringify(import.meta.env.VITE_API_URL);

export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/api/weeabApi/anime' }),
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
        animeData: builder.query({
            query: ({ token, mediaState, pageNo }) => ({
                url: `/${mediaState}`,
                method: 'GET',
                params: { pageNo },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
    })
});


export const { useLazySeasonsNowMainQuery, useLazyAnimeDataQuery } = animeApi;