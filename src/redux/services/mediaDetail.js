import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const mediaDetailApi = createApi({
    reducerPath: 'mediaDetailApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api/weeabApi/detail' }),
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