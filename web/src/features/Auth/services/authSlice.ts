import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'api/authApi';
import { RootState } from 'app/store';
import { User } from 'models/User';

export interface LoginPayload {
  identifier: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const login = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
  const data = await authApi.login(payload);

  return data.results;
});
export const register = createAsyncThunk('auth/register', async (payload: RegisterPayload) => {
  const data = await authApi.register(payload);

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
      localStorage.setItem('token', '');
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.token = null;
      });
  },
});

// Actions
export const authActions = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
// Selectors

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
