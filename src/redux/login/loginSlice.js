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

const loginSlice = createSlice({});

export default loginSlice.reducer;
