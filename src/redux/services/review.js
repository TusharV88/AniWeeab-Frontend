import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = JSON.stringify(import.meta.env.VITE_API_URL);

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/api/review' }),
    endpoints: (builder) => ({
        reviewAdd: builder.mutation({
            query: ({ token, content, mediaID, mediaType, mediaImage, mediaTitle, mediaTitleEnglish }) => ({
                url: '/add',
                method: 'POST',
                body: {
                    content,
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
        reviewDelete: builder.mutation({
            query: ({ token, id }) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        reviewByUser: builder.query({
            query: (token) => ({
                url: '/user',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        reviewByMedia: builder.query({
            query: ({ token, mediaID }) => ({
                url: '/media',
                method: 'GET',
                params: { mediaID },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
    })
});


export const { useReviewAddMutation, useReviewDeleteMutation, useLazyReviewByUserQuery, useLazyReviewByMediaQuery } = reviewApi;