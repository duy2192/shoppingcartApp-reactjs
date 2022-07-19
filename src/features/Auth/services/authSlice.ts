import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'api/authApi';
import { User } from 'models/User';

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const login = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  const data = await authApi.login(payload);

  return data.results;
});

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.token = null;
      });
  },
});

// Actions
export const authActions = authSlice.actions;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;
// Selectors

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
