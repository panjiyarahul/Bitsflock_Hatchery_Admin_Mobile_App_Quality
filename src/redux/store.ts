import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Reducer
import userReducer from './reducer/userReducer';
//API
import { userAPI } from './api/userAPI';
import { dashboardAPI } from './api/dashboardAPI';
import { profileAPI } from './api/profileAPI';
import { activeflockAPI } from './api/activeflockAPI';
import { closedflockAPI } from './api/closedflockAPI';
import { salesreportAPI } from './api/salesreportAPI';

// persist config for user slice
const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: [
    'accessToken',
    'expiresInSeconds',
    'userId',
    'username',
    'email',
    'role',
    'isLoggedIn',
  ],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [activeflockAPI.reducerPath]: activeflockAPI.reducer,
    [closedflockAPI.reducerPath]: closedflockAPI.reducer,
    [salesreportAPI.reducerPath]: salesreportAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      userAPI.middleware,
      dashboardAPI.middleware,
      profileAPI.middleware,
      activeflockAPI.middleware,
      closedflockAPI.middleware,
      salesreportAPI.middleware,
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
