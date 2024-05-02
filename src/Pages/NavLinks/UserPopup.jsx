import React, { useEffect, useRef } from 'react';

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
  return (
    <div
      ref={popupRef}
      className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
      onMouseDown={handleMouseDown}
    >
      <a
        href="/create-event"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-inter font-semibold"
      >
        Create Event
      </a>
      <a
        href="/"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-inter font-semibold"
      >
        Profile
      </a>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white font-inter font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default UserPopup;
