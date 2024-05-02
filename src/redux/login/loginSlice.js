import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../BaseUrl';

export const login = createAsyncThunk(
  'login',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axios.post(
        `${baseUrl}api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { userId, email: userEmail, token } = response.data;
      dispatch(setUser({ userId, email: userEmail, token }));

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userId: null,
    token: null,
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = 'Login Success';
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
        state.message = 'Login Failed';
      });
  },
});

export const { setUser, logout } = loginSlice.actions;
export const selectUserId = (state) => state.login.userId;
export const selectToken = (state) => state.login.token;
export const selectMessage = (state) => state.login.message;
export default loginSlice.reducer;
