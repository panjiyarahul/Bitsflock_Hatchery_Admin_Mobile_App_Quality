import AsyncStorage from '@react-native-async-storage/async-storage';
import { ad2bs } from 'ad-bs-converter';
import {
  BasicResponse,
  IStoredAuthSession,
  IStringifiedApiResponse,
} from '../types/apiTypes';

const USER_STORAGE_KEY = 'User';

export const getUserDetail = async (): Promise<IStoredAuthSession | null> => {
  try {
    const user = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      return JSON.parse(user) as IStoredAuthSession;
    }
    return null;
  } catch (error) {
    console.error('Error getting user detail:', error);
    return null;
  }
};

export const setAuthSession = async (
  session: IStoredAuthSession,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error setting auth session:', error);
  }
};

export const clearUserDetail = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user detail:', error);
  }
};

export const errorMessage = (error: any): string => {
  if (
    error &&
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'Message' in error.data &&
    typeof (error.data as BasicResponse).message === 'string'
  ) {
    return (error.data as BasicResponse).message;
  }
  return 'Something went wrong, try again later';
};

export const safeString = (v: any) => (v == null ? '' : String(v));

export const toFormData = (data: object) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) =>
    formData.append(key, String(value)),
  );
  return formData;
};

export const parseJsonString = <T>(value: string | T | null | undefined): T => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return {} as T;
    }
  }

  return (value ?? {}) as T;
};

export const parseStringifiedApiData = <T extends object>(
  response: IStringifiedApiResponse<T>,
): T => parseJsonString(response?.data);

export const formatDate = (
  value?: string,
  options?: { includeWeekday?: boolean; dayFirst?: boolean },
): string => {
  if (!value) {
    return '-';
  }

  const adDate = value.split('T')[0];
  const parts = adDate.split('-');

  if (parts.length !== 3) {
    return value;
  }

  try {
    const bsDate = ad2bs(`${parts[0]}/${parts[1]}/${parts[2]}`);
    const dayOfWeek = bsDate?.en?.strDayOfWeek;
    const month = bsDate?.en?.strMonth;
    const day = bsDate?.en?.day;
    const year = bsDate?.en?.year;
    const includeWeekday = options?.includeWeekday ?? true;
    const dayFirst = options?.dayFirst ?? false;

    if (!month || !day || !year) {
      return value;
    }

    const shortDayMap: Record<string, string> = {
      Aaitabaar: 'Sun',
      Sombaar: 'Mon',
      Mangalbaar: 'Tue',
      Budhabaar: 'Wed',
      Bihibaar: 'Thur',
      Shukrabaar: 'Fri',
      Shanibaar: 'Sat',
    };

    const formattedDate = dayFirst
      ? `${day} ${month}, ${year}`
      : `${month} ${day}, ${year}`;

    if (!includeWeekday) {
      return formattedDate;
    }

    if (!dayOfWeek) {
      return value;
    }

    const shortDay =
      shortDayMap[dayOfWeek as keyof typeof shortDayMap] ?? dayOfWeek;

    return `${shortDay}, ${formattedDate}`;
  } catch {
    return value;
  }
};
