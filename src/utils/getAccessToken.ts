import type {
  BaseQueryFn,
  FetchBaseQueryError,
  BaseQueryApi,
} from '@reduxjs/toolkit/query';

type LegacyTokenResponse = {
  access_token?: string;
};

type TokenPayloadResponse = {
  data?: {
    value?: string;
    validTo?: string;
  } | null;
};

const hasLegacyAccessToken = (
  response: LegacyTokenResponse | TokenPayloadResponse | undefined,
): response is LegacyTokenResponse => !!response && 'access_token' in response;

const hasTokenPayload = (
  response: LegacyTokenResponse | TokenPayloadResponse | undefined,
): response is TokenPayloadResponse => !!response && 'data' in response;

export const getAccessToken = async (
  baseQuery: BaseQueryFn<any, unknown, FetchBaseQueryError>,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const tokenResponse = await baseQuery(
    {
      url: '/api/token',
      method: 'get',
    },
    api,
    extraOptions,
  );

  if (tokenResponse.error) {
    throw tokenResponse.error;
  }

  const response = tokenResponse.data as
    | LegacyTokenResponse
    | TokenPayloadResponse
    | undefined;
  const accessToken = hasLegacyAccessToken(response)
    ? response.access_token
    : hasTokenPayload(response)
    ? response.data?.value
    : undefined;

  if (!accessToken) {
    throw new Error('Token response did not include an access token');
  }

  return accessToken;
};
