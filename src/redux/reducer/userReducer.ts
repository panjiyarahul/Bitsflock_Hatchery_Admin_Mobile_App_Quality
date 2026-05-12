import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { IStoredAuthSession } from '../../types/apiTypes';
import { userAPI } from '../api/userAPI';
import { RootState } from '../store';

interface UserState {
  accessToken: string | null;
  expiresInSeconds: number | null;
  userId: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  accessToken: null,
  expiresInSeconds: null,
  userId: null,
  username: null,
  email: null,
  role: null,
  isLoggedIn: false,
  isLoading: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IStoredAuthSession>) => {
      const { accessToken, expiresInSeconds, userId, username, email, role } =
        action.payload;

      state.accessToken = accessToken;
      state.expiresInSeconds = expiresInSeconds;
      state.userId = userId;
      state.username = username;
      state.email = email;
      state.role = role;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    clearUser: state => {
      state.accessToken = null;
      state.expiresInSeconds = null;
      state.userId = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(userAPI.endpoints.login.matchPending, state => {
      state.isLoading = true;
    });
    builder.addMatcher(
      userAPI.endpoints.login.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.expiresInSeconds = action.payload.expiresInSeconds;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isLoggedIn = true;
        state.isLoading = false;
      },
    );
    builder.addMatcher(userAPI.endpoints.login.matchRejected, state => {
      state.isLoading = false;
    });
  },
});

export const { setUser, clearUser, setLoading } = userReducer.actions;

export const selectUserInfo = createSelector(
  (state: RootState) => state.user,
  user => ({
    accessToken: user.accessToken,
    expiresInSeconds: user.expiresInSeconds,
    userId: user.userId,
    username: user.username,
    email: user.email,
    role: user.role,
    isLoggedIn: user.isLoggedIn,
    isLoading: user.isLoading,
  }),
);

export default userReducer.reducer;
