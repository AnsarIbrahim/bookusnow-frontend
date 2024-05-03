import { configureStore } from '@reduxjs/toolkit';

import signupSlice from './signup/signupSlice';
import loginSlice from './login/loginSlice';
import usersSlice from './userList/usersSlice';
import eventsSlice from './events/eventsSlice';
import upcomeEventSlice from './events/upcomeEventSlice';
import createEventSlice from './events/createEventSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    users: usersSlice,
    events: eventsSlice,
    upcomingEventsData: upcomeEventSlice,
    createEvent: createEventSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
