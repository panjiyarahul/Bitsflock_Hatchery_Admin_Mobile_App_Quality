import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import {
  IFlockListResponse,
  IStringifiedApiResponse,
  IFlockFarmListResponse,
  IFlockReportItem,
} from '../../types/apiTypes';
import { parseStringifiedApiData } from '../../utils/helper';

export const closedflockAPI = createApi({
  reducerPath: 'closedflockApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['closedflock'],
  endpoints: builder => ({
    getClosedFlockList: builder.query<IFlockListResponse, void>({
      query: () => `/owner_api/closed_flock_list`,
      transformResponse: (
        response: IStringifiedApiResponse<IFlockListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['closedflock'],
    }),
    getClosedFlockFarmList: builder.query<IFlockFarmListResponse, number>({
      query: id => `/owner_api/closed_laying_rearing_Reports_${id}`,
      transformResponse: (
        response: IStringifiedApiResponse<IFlockFarmListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['closedflock'],
    }),
    getClosedFlockReport: builder.query<
      IFlockReportItem,
      { id: number; age: number }
    >({
      query: ({ id, age }) =>
        `/owner_api/closed_laying_rearing_bookkeeping_day_to_day_summary_report_${id}_${age}`,
      transformResponse: (
        response: IStringifiedApiResponse<IFlockReportItem>,
      ) => parseStringifiedApiData(response),
      providesTags: ['closedflock'],
    }),
  }),
});

export const {
  useGetClosedFlockListQuery,
  useGetClosedFlockFarmListQuery,
  useGetClosedFlockReportQuery,
} = closedflockAPI;
