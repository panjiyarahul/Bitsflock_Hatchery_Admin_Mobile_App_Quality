import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import {
  ISalesDetailsResponse,
  ISalesReportListResponse,
  IStringifiedApiResponse,
} from '../../types/apiTypes';
import { parseStringifiedApiData } from '../../utils/helper';

export const salesreportAPI = createApi({
  reducerPath: 'salesreportApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['salesreport'],
  endpoints: builder => ({
    getSalesReportList: builder.query<ISalesReportListResponse, void>({
      query: () => `/owner_api/sales`,
      transformResponse: (
        response: IStringifiedApiResponse<ISalesReportListResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['salesreport'],
    }),
    getSalesDetails: builder.query<ISalesDetailsResponse, number>({
      query: id => `/owner_api/sales_items_${id}`,
      transformResponse: (
        response: IStringifiedApiResponse<ISalesDetailsResponse>,
      ) => parseStringifiedApiData(response),
      providesTags: ['salesreport'],
    }),
  }),
});

export const { useGetSalesReportListQuery, useGetSalesDetailsQuery } =
  salesreportAPI;
