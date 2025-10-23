import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../utilities/createBaseQuery.ts';
import type {IAuthResponse, IRegister} from "./types.ts";
import {serialize} from "object-to-formdata";
import type {RootState} from "../store";
import {loginSuccess} from "../store/authSlice.ts";
import {apiCart} from "./apiCart.ts";
import {clearCart} from "../store/localCartSlice.ts";
import type { Dispatch } from '@reduxjs/toolkit';

export interface ILoginRequest {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
}
export interface IForgotPasswordRequest {
    email: string;
}

export  interface IValidateTokenRequest {
    token: string;
    email: string;
}

export interface IResetPasswordRequest {
    password: string;
    confirmPassword: string;
    token: string;
    email: string;
}


const handleAuthSuccess = async (
    queryFulfilled: Promise<{ data: IAuthResponse }>,
    dispatch: Dispatch,
    getState: () => RootState
) => {
    try {
        const { data } = await queryFulfilled;
        if (data?.token) {
            dispatch(loginSuccess(data.token));

            const localCart = getState().localCart.items;
            if (localCart.length > 0) {
                await dispatch(apiCart.endpoints.addToCartsRange.initiate(localCart) as any).unwrap();
            }

            dispatch(clearCart());
        }
    } catch (error) {
        console.error('Auth error:', error);
    }
};



export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('account'),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            onQueryStarted: async (_arg, { dispatch, getState, queryFulfilled }) =>
                handleAuthSuccess(queryFulfilled, dispatch, getState)
        }),


        register: builder.mutation<ILoginResponse, IRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);
                return{
                    url: 'register',
                    method: 'POST',
                    body: formData};
            },
        }),
        loginByGoogle: builder.mutation<{token: string}, string>({
            query: (token) => ({
                url: 'GoogleLogin',
                method: 'POST',
                body: {token}
            }),
            onQueryStarted: async (_arg, { dispatch, getState, queryFulfilled }) =>
                handleAuthSuccess(queryFulfilled, dispatch, getState)
        }),

        forgotPassword: builder.mutation<IForgotPasswordRequest,void>({
            query: (data) => ({
                url: 'ForgotPassword',
                method: 'POST',
                body: data
            })
        }),

        validateResetToken: builder.query<{ isValid: boolean }, IValidateTokenRequest>({
            query: (params) => ({
                url: 'validateResetToken',
                params, // це додасть параметри як query string: ?token=abc&email=...
            }),
            providesTags: ['Account'],
        }),

        resetPassword: builder.mutation<IResetPasswordRequest, void>({
            query: (password) => ({
                url: 'ResetPassword',
                method: 'POST',
                body: password
            })
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLoginByGoogleMutation,
    useForgotPasswordMutation,
    useValidateResetTokenQuery,
    useResetPasswordMutation,
} = apiAccount;