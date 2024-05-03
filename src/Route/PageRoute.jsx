import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/HomePage';
import LoginForm from '../Users/components/Form/LoginForm';
import UserEvents from '../Events/pages/UserEvents';
import Auth from '../Users/pages/Auth';

const PageRoute = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/user-events" element={<UserEvents />} />
  </Routes>
);

export default PageRoute;
