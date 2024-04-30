import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import baseUrl from '../baseUrl';

export const login = createAsyncThunk(
  'login',
  async ({ username, password }) => {
    try {
      const response = await axios.post(`${baseUrl}login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
