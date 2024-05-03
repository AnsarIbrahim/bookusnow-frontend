import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  signup,
  setUsername,
  setEmail,
  setPassword,
  setRole,
  setImage,
  selectSignupSuccess,
} from '../../../redux/signup/signupSlice';
import Popup from '../../../components/Popup';
import './toggle.css';

const SignupForm = ({ onSignupSuccess }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.signup.username);
  const email = useSelector((state) => state.signup.email);
  const password = useSelector((state) => state.signup.password);
  const role = useSelector((state) => state.signup.role);
  const image = useSelector((state) => state.signup.image);
  const signupSuccess = useSelector(selectSignupSuccess);

  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (signupSuccess) {
      setPopup({ show: true, message: 'Signup successful!', type: 'success' });
      onSignupSuccess();
    }
  }, [signupSuccess, onSignupSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signup({ username, email, password, role, image }));
  };

  const handleFileChange = (event) => {
    dispatch(setImage(event.target.files[0]));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
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
            onChange={(e) => dispatch(setPassword(e.target.value))}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center justify-around">
          <div className="relative inline-block w-6 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="role"
              id="role"
              checked={role === 'admin'}
              onChange={(e) =>
                dispatch(setRole(e.target.checked ? 'admin' : 'user'))
              }
              className="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor="role"
              className="toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <label
            htmlFor="image"
            className="cursor-pointer text-white bg-blue-500 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            required
            className="hidden"
          />
          {image && <span className="text-sm">{image.name}</span>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      {popup.show && <Popup message={popup.message} type={popup.type} />}
    </>
  );
};

export default SignupForm;
