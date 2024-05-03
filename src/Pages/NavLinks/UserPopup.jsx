import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const UserPopup = ({ handleLogout, setShowPopup }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowPopup]);

  const handleMouseDown = (event) => {
    event.stopPropagation();
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      ref={popupRef}
      className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
      onMouseDown={handleMouseDown}
    >
      <NavLink
        to="/user-events"
        onClick={closePopup}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-inter font-semibold"
      >
        Create Event
      </NavLink>
      <a
        href="/"
        onClick={closePopup}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-inter font-semibold"
      >
        Profile
      </a>
      <button
        onClick={() => {
          handleLogout();
          closePopup();
        }}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-inter font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default UserPopup;
