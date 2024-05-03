import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../../redux/login/loginSlice';
import { selectMessage } from '../../../redux/login/loginSlice';
import LoadingSpinner from '../../../Shared/Components/LoadingSpinner/LoadingSpinner';
import Popup from '../../../components/Popup';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (message) {
      setIsLoading(false);
      if (message === 'Login successful') {
        setPopup({ show: true, message: message, type: 'success' });
      } else {
        setPopup({ show: true, message: message, type: 'fail' });
      }
    }
  }, [message, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
    setIsLoading(true);
    navigate('/');
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      {popup.show && <Popup message={popup.message} type={popup.type} />}
    </>
  );
};

export default LoginForm;
