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

const signupSlice = createSlice({});

export default signupSlice.reducer;
