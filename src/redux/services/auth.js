import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL + '/api/user' }),
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query: (userInfo) => ({
                url: '/register',
                method: 'POST',
                body: userInfo,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        userLogin: builder.mutation({
            query: (userInfo) => ({
                url: '/login',
                method: 'POST',
                body: userInfo,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        userResetPassLink: builder.mutation({
            query: (email) => ({
                url: '/sendResetLink',
                method: 'POST',
                body: { email },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        userResetPassword: builder.mutation({
            query: ({ id, token, password, confirmPassword }) => ({
                url: `/reset/${id}/${token}`,
                method: 'POST',
                body: { password, confirmPassword },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        userPasswordUpdate: builder.mutation({
            query: ({ token, password, confirmPassword }) => ({
                url: '/updatePassword',
                method: 'PUT',
                body: { password, confirmPassword },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        userLogged: builder.query({
            query: (token) => ({
                url: '/logged',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? `Bearer ${token}` : ''}`,
                }
            })
        }),
        userDeleteAccount: builder.query({
            query: (token) => ({
                url: '/delete-account',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token ? `Bearer ${token}` : ''}`,
                }
            })
        }),
    })
});



export const { useUserRegisterMutation, useUserLoginMutation, useUserResetPassLinkMutation, useUserResetPasswordMutation, useUserPasswordUpdateMutation, useLazyUserLoggedQuery, useLazyUserDeleteAccountQuery } = authApi;
