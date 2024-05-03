import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../baseUrl';

export const createEvent = createAsyncThunk(
  'event/create',
  async (
    { eventName, cityName, date, userLocation, image, creator },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('cityName', cityName);
    formData.append('date', date);
    formData.append('userLocation', userLocation);
    formData.append('image', image);
    formData.append('creator', creator);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${baseUrl}api/v1/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const createEventSlice = createSlice({
  name: 'createEvent',
  initialState: {
    eventName: '',
    cityName: '',
    date: '',
    userLocation: '',
    image: null,
    creator: '',
    status: 'idle',
    error: null,
    createSuccess: false,
  },
  reducers: {
    setEventName: (state, action) => {
      state.eventName = action.payload;
    },
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setUserId: (state, action) => {
      state.creator = action.payload;
    },
    resetEventForm: (state) => {
      state.eventName = '';
      state.cityName = '';
      state.date = '';
      state.userLocation = '';
      state.image = null;
      state.userId = '';
      state.status = 'idle';
      state.error = null;
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
        state.createSuccess = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.createSuccess = true;
        state.event = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'Failed to create event';
      });
  },
});

export const selectCreateSuccess = (state) => state.event?.createSuccess;
export const {
  setEventName,
  setCityName,
  setDate,
  setUserLocation,
  setImage,
  setUserId,
  resetEventForm,
} = createEventSlice.actions;

export default createEventSlice.reducer;
