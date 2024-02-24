import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = JSON.stringify(import.meta.env.VITE_API_URL);

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/api/weeabApi' }),
    endpoints: (builder) => ({
        seasonsNow: builder.query({
            query: (token) => ({
                url: '/seasons',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        mostPopular: builder.query({
            query: (token) => ({
                url: '/popular',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        randomFavorite: builder.query({
            query: (token) => ({
                url: '/favorite',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        })
    })
});


export const { useLazySeasonsNowQuery, useLazyMostPopularQuery, useLazyRandomFavoriteQuery } = homeApi;