import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '../BaseUrl';

export const signup = createAsyncThunk(
  'signup',
  async ({ username, email, password, role, image }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('image', image);

    try {
      const response = await axios.post(
        `${baseUrl}api/v1/users/signup`,
        formData
      );

      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    username: '',
    email: '',
    password: '',
    role: 'user',
    image: null,
    status: 'idle',
    error: null,
    signupSuccess: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.signupSuccess = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.signupSuccess = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || 'Failed to sign up';
      });
  },
});

export const selectSignupSuccess = (state) => state.signup.signupSuccess;
export const { setUsername, setEmail, setPassword, setRole, setImage } =
  signupSlice.actions;

export default signupSlice.reducer;
