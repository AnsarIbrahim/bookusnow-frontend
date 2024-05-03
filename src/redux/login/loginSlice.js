import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../baseUrl';

export const login = createAsyncThunk(
  'login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}api/v1/users/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { userId, email: userEmail, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      return { userId, email: userEmail, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
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
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      state.userId = null;
      state.token = null;
    },
    resetMessage: (state) => {
      state.message = null;
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
        state.userId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { setUser, logout } = loginSlice.actions;
export const selectUserId = (state) => state.login.userId;
export const selectToken = (state) => state.login.token;
export const selectMessage = (state) => state.login.message;
export default loginSlice.reducer;
