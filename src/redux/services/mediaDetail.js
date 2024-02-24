import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = JSON.stringify(import.meta.env.VITE_API_URL);

export const mediaDetailApi = createApi({
    reducerPath: 'mediaDetailApi',
    baseQuery: fetchBaseQuery({ baseUrl: url + '/api/weeabApi/detail' }),
    endpoints: (builder) => ({
        mediaDetail: builder.query({
            query: ({ token, category, id }) => ({
                url: `/${category}/${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
    })
});


export const { useLazyMediaDetailQuery } = mediaDetailApi;