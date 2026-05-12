import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import {
  IFlockListResponse,
  IPenListResponse,
  IStringifiedApiResponse,
  IFlockFarmListResponse,
  IFeedProgramReportData,
  IFeedProgramReportItem,
  IFlockReportItem,
} from '../../types/apiTypes';
import { parseJsonString, parseStringifiedApiData } from '../../utils/helper';

export const activeflockAPI = createApi({
  reducerPath: 'flockApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['flock'],
  endpoints: builder => ({
    getFlockList: builder.query<IFlockListResponse, void>({
      query: () => `/owner_api/flock_list`,
      transformResponse: (
        response: IStringifiedApiResponse<IFlockListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['flock'],
    }),
    getPenList: builder.query<IPenListResponse, number | string>({
      query: flockName =>
        `/owner_api/pen_list_under_flock?flockName=${flockName}`,
      transformResponse: (
        response: IStringifiedApiResponse<IPenListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['flock'],
    }),
    getFeedProgramReport: builder.query<
      IFeedProgramReportItem[],
      number | string
    >({
      query: id => `/api-poultry/report-feed-program-report/${id}`,
      transformResponse: (
        response: IStringifiedApiResponse<IFeedProgramReportData>,
      ) => {
        const data = parseStringifiedApiData<IFeedProgramReportData>(response);
        return parseJsonString<IFeedProgramReportItem[]>(data?.result);
      },
      providesTags: ['flock'],
    }),
    getFlockFarmList: builder.query<IFlockFarmListResponse, void>({
      query: id => `/owner_api/flock_bookkeeping_report_flock_pen_wise_${id}`,
      transformResponse: (
        response: IStringifiedApiResponse<IFlockFarmListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['flock'],
    }),
    getFlockReport: builder.query<
      IFlockReportItem,
      { id: number; bId: number }
    >({
      query: ({ id, bId }) =>
        `/owner_api/Get_Flock_Bookkeeping_Day_to_Day_Report_Bookkeeping_id_wise_${id}_${bId}`,
      transformResponse: (
        response: IStringifiedApiResponse<IFlockReportItem>,
      ) => parseStringifiedApiData(response),
      providesTags: ['flock'],
    }),
  }),
});

export const {
  useGetFlockListQuery,
  useGetPenListQuery,
  useGetFlockFarmListQuery,
  useGetFeedProgramReportQuery,
  useGetFlockReportQuery,
} = activeflockAPI;
