import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const favoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api/favorite' }),
    endpoints: (builder) => ({
        favoriteAdd: builder.mutation({
            query: ({ token, mediaID, mediaType, mediaImage, mediaTitle, mediaTitleEnglish }) => ({
                url: '/add',
                method: 'POST',
                body: {
                    mediaID,
                    mediaType,
                    mediaImage,
                    mediaTitle,
                    mediaTitleEnglish
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        favoriteDelete: builder.mutation({
            query: ({ token, mediaID }) => ({
                url: `/delete/${mediaID}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        favoriteByUser: builder.query({
            query: (token) => ({
                url: '/user',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
    })
});


export const { useFavoriteAddMutation, useFavoriteDeleteMutation, useLazyFavoriteByUserQuery } = favoriteApi;