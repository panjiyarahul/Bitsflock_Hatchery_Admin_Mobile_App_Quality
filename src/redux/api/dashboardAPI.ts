import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../utils/baseQueryWithReauth';
import {
  IStringifiedApiResponse,
  IRemAndDailyEgg,
  IActiveListResponse,
  IActiveFlockBookkeeping,
  IActiveFlockRawItem,
} from '../../types/apiTypes';
import { parseJsonString, parseStringifiedApiData } from '../../utils/helper';

export const dashboardAPI = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['dashboard'],
  endpoints: builder => ({
    getRemAndDailyEgg: builder.query<IRemAndDailyEgg, void>({
      query: () => `/owner_api/dashboard_information`,
      transformResponse: (response: IStringifiedApiResponse<IRemAndDailyEgg>) =>
        parseStringifiedApiData(response),
      providesTags: ['dashboard'],
    }),
    getActiveFlock: builder.query<IActiveListResponse, void>({
      query: () => `/owner_api/dash_active_flock_list`,
      transformResponse: (
        response: IStringifiedApiResponse<IActiveFlockRawItem[]>,
      ) => {
        const flockList =
          parseStringifiedApiData<IActiveFlockRawItem[]>(response);

        return Array.isArray(flockList)
          ? flockList.map(item => {
              const bookkeeping = parseJsonString<IActiveFlockBookkeeping>(
                item.bookkeeping,
              );

              return {
                flockName: item.flockname ?? '',
                runningAge: bookkeeping.running_age ?? 0,
                shedName: bookkeeping.shed_Name ?? '-',
                weight: bookkeeping.bodyWeight ?? 0,
                closingFemaleBirds: bookkeeping.closing_Female_birds ?? 0,
                closingMaleBirds: bookkeeping.closing_Male_birds ?? 0,
                femaleMortalityNumber:
                  bookkeeping.female_mortality_Number ?? 0,
                maleMortalityNumber: bookkeeping.male_mortality_Number ?? 0,
                femaleMortalityPercentage:
                  bookkeeping.female_mortality_percentage ?? 0,
                maleMortalityPercentage:
                  bookkeeping.male_mortality_percentage ?? 0,
                feedPerBirdFemale: bookkeeping.feed_per_bird_female ?? 0,
                feedPerBirdMale: bookkeeping.feed_per_bird_male ?? 0,
                totalFeedConsumptionFemale:
                  bookkeeping.total_feed_consumption_female ?? 0,
                totalFeedConsumptionMale:
                  bookkeeping.total_feed_consumption_male ?? 0,
                costPerBirdFemale: bookkeeping.cost_per_bird_female ?? 0,
                costPerBirdMale: bookkeeping.cost_per_bird_male ?? 0,
                runningCostFemale: bookkeeping.running_cost_female ?? 0,
                runningCostMale: bookkeeping.running_cost_male ?? 0,
              };
            })
          : [];
      },
      providesTags: ['dashboard'],
    }),
  }),
});

export const { useGetRemAndDailyEggQuery, useGetActiveFlockQuery } =
  dashboardAPI;
