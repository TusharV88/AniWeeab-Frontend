import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api/weeabApi' }),
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