import { createApi, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '../../utils/getAccessToken';
import { jwtDecode } from 'jwt-decode';
import { setAuthSession, toFormData } from '../../utils/helper';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import { SERVER } from '../../constants/config';
import {
  ILoginApiResponse,
  ILoginRequest,
  IStoredAuthSession,
} from '../../types/apiTypes';

type LoginTokenClaims = {
  exp?: number;
};

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: async (args, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions, baseUrl: `${SERVER}` }),
  tagTypes: ['user'],
  endpoints: builder => ({
    login: builder.mutation<IStoredAuthSession, ILoginRequest>({
      async queryFn(user, _queryApi, _extraOptions, baseQuery) {
        try {
          const access_token = await getAccessToken(
            baseQuery,
            _queryApi,
            _extraOptions,
          );

          const userResponse = await baseQuery({
            url: '/api/login',
            method: 'POST',
            body: toFormData(user),
            headers: { Authorization: `Bearer ${access_token}` },
          });

          if (userResponse.error) {
            return { error: userResponse.error as FetchBaseQueryError };
          }

          const data = userResponse.data as ILoginApiResponse;
          const loginToken = data.data?.token;

          if (!loginToken) {
            return {
              error: {
                status: 'CUSTOM_ERROR',
                data,
                error: data?.message ?? 'Login failed',
              } as FetchBaseQueryError,
            };
          }

          const decode = jwtDecode<LoginTokenClaims>(loginToken);
          const userId = user.userName;
          const email = data.data?.phone ?? '';
          const username = user.userName;
          const role = data.data?.role ?? 'Admin';

          if (!userId || !username || !email) {
            return {
              error: {
                status: 'CUSTOM_ERROR',
                data,
                error: data?.message ?? 'Login failed',
              } as FetchBaseQueryError,
            };
          }

          const session: IStoredAuthSession = {
            accessToken: loginToken,
            expiresInSeconds: decode.exp ?? null,
            userId,
            username,
            email,
            role,
          };

          await setAuthSession(session);

          return { data: session };
        } catch (error) {
          return {
            error: {
              status: 'FETCH_ERROR',
              error: (error as Error).message,
            } as FetchBaseQueryError,
          };
        }
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useLoginMutation } = userAPI;
