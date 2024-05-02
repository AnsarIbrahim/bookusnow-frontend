import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoHeart } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { MdMenu, MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';

import Button from '../../components/Button';
import Searchbar from '../../components/Searchbar';
import Map from '../../Shared/Components/Map/Map';
import Modal from '../../Shared/Components/Modal/Modal';
import { selectUsers } from '../../redux/userList/usersSlice';
import { selectUserId, logout } from '../../redux/login/loginSlice';
import UserPopup from './UserPopup';
import './mapnav.css';

const NavBar = () => {
  const userId = useSelector(selectUserId);
  const users = useSelector(selectUsers);
  const [showSearch, setShowSearch] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef();

  const loggedInUser =
    userId && Array.isArray(users) && users.find((u) => u._id === userId);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between md:px-10 p-5">
        <div className="">
          <NavLink to="/" className="text-logo font-bold text-xl font-inter">
            BookUsNow
          </NavLink>
          <p
            className="md:hidden flex items-center justify-center text-xs font-inter font-medium text-slate-500 gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200"
            onClick={openMapHandler}
          >
            <FaLocationDot className="text-gray-400" /> Mumbai,India{' '}
            <IoIosArrowForward />
          </p>

          <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header="Mumbai, India"
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={
              <Button
                onClick={closeMapHandler}
                bgColor="bg-bgDanger"
                textColor="text-white"
              >
                Close
              </Button>
            }
          >
            <div className="map-container">
              <Map center={{ lat: 19.076, lng: 72.8777 }} zoom={12} />
            </div>
          </Modal>
        </div>
        <div className="md:flex items-center gap-4 hidden ml-3">
          <Button
            size="xs"
            borderColor="border-black"
            icon={<MdMenu />}
            bgColor="bg-black"
            textColor="text-white"
            borderRadius="rounded-lg"
          >
            Categories
          </Button>
          <Searchbar />
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex">
            <Button
              size="xs"
              icon={<IoHeart />}
              borderWidth="border-0"
              iconColor="text-gray-400"
              className="md:block hidden"
            >
              Favorites
            </Button>
            {loggedInUser ? (
              <>
                <img
                  src={`data:image/jpeg;base64,${loggedInUser.image}`}
                  alt={loggedInUser.username}
                  className="w-8 h-8 object-cover rounded-full m-2 shadow-lg z-10 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={() => setShowPopup(!showPopup)}
                />
                {showPopup && (
                  <UserPopup
                    handleLogout={handleLogout}
                    setShowPopup={setShowPopup}
                  />
                )}
              </>
            ) : (
              <Button
                size="xs"
                borderColor="border-stroke"
                className="md:block hidden"
                type="link"
                to="/auth"
              >
                Sign in
              </Button>
            )}
          </div>
          <div className="relative" ref={searchRef}>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute top-10 left-0 right-5 flex justify-center items-center md:hidden bg-white rounded-lg shadow-md"
              >
                <Searchbar />
              </motion.div>
            )}
            <div className="md:hidden flex items-center -space-x-4 justify-center ml-16 md:ml-0">
              {!showSearch && (
                <Button
                  size="xs"
                  icon={<MdSearch />}
                  borderWidth="border-0"
                  iconColor="text-gray-400"
                  onClick={() => setShowSearch(true)}
                />
              )}
              <Button
                size="xs"
                icon={<IoHeart />}
                borderWidth="border-0"
                iconColor="text-gray-400"
              />
              {loggedInUser ? (
                <>
                  <img
                    src={`data:image/jpeg;base64,${loggedInUser.image}`}
                    alt={loggedInUser.username}
                    className="w-6 h-6 object-cover rounded-xl m-2 shadow-lg z-10 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => setShowPopup(!showPopup)}
                  />
                  {showPopup && (
                    <UserPopup
                      handleLogout={handleLogout}
                      setShowPopup={setShowPopup}
                    />
                  )}
                </>
              ) : (
                <Button
                  size="xs"
                  icon={<FaUser />}
                  borderWidth="border-0"
                  iconColor="text-gray-400"
                  type="link"
                  to="/auth"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
