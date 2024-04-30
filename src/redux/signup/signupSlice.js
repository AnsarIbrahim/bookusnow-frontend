import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import baseUrl from '../baseUrl';

export const signup = createAsyncThunk(
  'signup',
  async ({ username, password }) => {
    try {
      const response = await axios.post(`${baseUrl}signup`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export default signupSlice.reducer;
