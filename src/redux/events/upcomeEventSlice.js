import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../BaseUrl';

export const fetchUpcomeEvents = createAsyncThunk(
  'events/fetchUpcomeEvents',
  async () => {
    const response = await axios.get(`${baseUrl}api/v1/events/upcomeEvent`);
    console.log(response.data);
    return response.data;
  }
);

const upcomeEventSlice = createSlice({
  name: 'upcomingEventsData',
  initialState: { upcomingEventsData: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomeEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpcomeEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.upcomingEventsData = action.payload.upcomingEventsData;
      })
      .addCase(fetchUpcomeEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default upcomeEventSlice.reducer;
