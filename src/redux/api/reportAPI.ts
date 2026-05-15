import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import {
  IStringifiedApiResponse,
  IReportDetailsData,
  IReportDetailsItem,
  IReportFlockListResponse,
  IReportPenListResponse,
  IStockWeeklyReportRequest,
} from '../../types/apiTypes';
import { parseJsonString, parseStringifiedApiData } from '../../utils/helper';

const parseReportRows = (
  response: IStringifiedApiResponse<IReportDetailsData | IReportDetailsItem[]>,
) => {
  const data =
    parseStringifiedApiData<IReportDetailsData | IReportDetailsItem[]>(
      response,
    );

  if (Array.isArray(data)) {
    return data;
  }

  const rows = parseJsonString<IReportDetailsItem[]>(data?.result);
  return Array.isArray(rows) ? rows : [];
};

export const reportAPI = createApi({
  reducerPath: 'reportApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['report'],
  endpoints: builder => ({
    getFlockList: builder.query<IReportFlockListResponse, void>({
      query: () => `/api-poultry/breeder-flock-list`,
      transformResponse: (
        response: IStringifiedApiResponse<IReportFlockListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['report'],
    }),
    getPenList: builder.query<IReportPenListResponse, number | string>({
      query: id =>
        `/api-poultry/breeder-pen-list-under-flock/${encodeURIComponent(
          String(id),
        )}`,
      transformResponse: (
        response: IStringifiedApiResponse<IReportPenListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['report'],
    }),
    getStockWeeklyReport: builder.query<
      IReportDetailsItem[],
      IStockWeeklyReportRequest
    >({
      query: ({ flockName, penId }) =>
        `/api-poultry/breeder-stock-weekly-report/${encodeURIComponent(
          flockName,
        )}/${encodeURIComponent(
          String(penId),
        )}`,
      transformResponse: (
        response: IStringifiedApiResponse<
          IReportDetailsData | IReportDetailsItem[]
        >,
      ) => parseReportRows(response),
      providesTags: ['report'],
    }),
    getPerformanceReport: builder.query<
      IReportDetailsItem[],
      string
    >({
      query: flockName =>
        `/api-poultry/breeder-performance-report/${encodeURIComponent(
          flockName,
        )}`,
      transformResponse: (
        response: IStringifiedApiResponse<
          IReportDetailsData | IReportDetailsItem[]
        >,
      ) => parseReportRows(response),
      providesTags: ['report'],
    }),
    getFlockBookReport: builder.query<
      IReportDetailsItem[],
      string
    >({
      query: flockName =>
        `/api-poultry/report-flockbook-report?flockName=${encodeURIComponent(
          flockName,
        )}`,
      transformResponse: (
        response: IStringifiedApiResponse<
          IReportDetailsData | IReportDetailsItem[]
        >,
      ) => parseReportRows(response),
      providesTags: ['report'],
    }),
  }),
});

export const {
  useGetFlockListQuery,
  useGetPenListQuery,
  useGetPerformanceReportQuery,
  useGetFlockBookReportQuery,
  useGetStockWeeklyReportQuery,
} = reportAPI;
