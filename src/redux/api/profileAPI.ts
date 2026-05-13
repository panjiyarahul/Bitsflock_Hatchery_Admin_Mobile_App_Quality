import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import {
  BasicResponse,
  IStringifiedApiResponse,
  IProfile,
} from '../../types/apiTypes';
import { parseStringifiedApiData } from '../../utils/helper';

export const profileAPI = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['profile'],
  endpoints: builder => ({
    getProfile: builder.query<IProfile, void>({
      query: () => `/owner_api/login_user_profile`,
      transformResponse: (response: IStringifiedApiResponse<IProfile>) =>
        parseStringifiedApiData(response),
      providesTags: ['profile'],
    }),
    deleteBreederFarmer: builder.mutation<BasicResponse, string>({
      query: phonenumber =>
        `/api/employeeapi/breeder-farmer-delete?phonenumber=${phonenumber}`,
      invalidatesTags: ['profile'],
    }),
  }),
});

export const { useGetProfileQuery, useDeleteBreederFarmerMutation } =
  profileAPI;
