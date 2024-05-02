import { configureStore } from '@reduxjs/toolkit';

import usersSlice from './userList/usersSlice';
import signupSlice from './signup/signupSlice';
import loginSlice from './login/loginSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    users: usersSlice,
  },
});

export default store;
