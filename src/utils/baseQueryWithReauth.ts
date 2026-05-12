import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { SERVER } from '../constants/config';
import { clearUser } from '../redux/reducer/userReducer';
import { clearUserDetail, getUserDetail } from './helper';

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { baseUrl?: string }
> = async (args, api, extraOptions) => {
  const baseUrl = extraOptions?.baseUrl || `${SERVER}`;
  const user = await getUserDetail();
  const baseQuery = fetchBaseQuery({ baseUrl });

  const fetchArgs: FetchArgs =
    typeof args === 'string' ? { url: args } : { ...args };

  const headers: Record<string, string> = fetchArgs.headers
    ? fetchArgs.headers instanceof Headers
      ? Object.fromEntries(fetchArgs.headers.entries())
      : Array.isArray(fetchArgs.headers)
      ? Object.fromEntries(fetchArgs.headers)
      : fetchArgs.headers
    : {};

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const isTokenExpired =
    typeof user?.expiresInSeconds === 'number' &&
    currentTimeInSeconds >= user.expiresInSeconds;

  if (isTokenExpired) {
    await clearUserDetail();
    api.dispatch(clearUser());
  }

  if (user?.expiresInSeconds && !isTokenExpired) {
    headers.Authorization = `Bearer ${user.accessToken}`;
  }

  fetchArgs.headers = headers;
  return baseQuery(fetchArgs, api, extraOptions);
};
