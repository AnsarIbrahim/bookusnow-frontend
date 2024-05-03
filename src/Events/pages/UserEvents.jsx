import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setEventName,
  setCityName,
  setDate,
  setImage,
  setUserLocation,
  selectCreateSuccess,
  createEvent,
} from '../../redux/events/createEventSlice';
import Popup from '../../components/Popup';

const UserEvents = () => {
  const dispatch = useDispatch();
  const eventName = useSelector((state) => state.createEvent.eventName);
  const cityName = useSelector((state) => state.createEvent.cityName);
  const date = useSelector((state) => state.createEvent.date);
  const userLocation = useSelector((state) => state.createEvent.userLocation);
  const image = useSelector((state) => state.createEvent.image);
  const creator = useSelector((state) => state.createEvent.creator);
  const createSuccess = useSelector(selectCreateSuccess);
  const [popup, setPopup] = useState({ message: '', type: '' });

  useEffect(() => {
    if (createSuccess) {
    }
  }, [createSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        createEvent({ eventName, cityName, date, userLocation, image, creator })
      ).unwrap();
      setPopup({ message: 'Event created successfully', type: 'success' });
    } catch (error) {
      setPopup({ message: 'Failed to create event', type: 'error' });
    }
  };

  const handleFileChange = (event) => {
    dispatch(setImage(event.target.files[0]));
  };

  return (
    <div className="pt-32 flex justify-center bg-slate-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg shadow-lg rounded-lg p-8 text-sm font-inter bg-slate-300 pb-5"
        encType="multipart/form-data"
      >
        {/* Event Name Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eventName"
          >
            Event Name
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
            id="eventName"
            name="eventName"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => dispatch(setEventName(e.target.value))}
          />
        </div>

        {/* City Name Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cityName"
          >
            City Name
          </label>
          <input
            required
            className="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cityName"
            name="cityName"
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => dispatch(setCityName(e.target.value))}
          />
        </div>

        {/* Date Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            required
            className="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => dispatch(setDate(e.target.value))}
          />
        </div>

        {/* User Location Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userLocation"
          >
            User Location
          </label>
          <input
            required
            className="shadow appearance-none text-xs border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userLocation"
            name="userLocation"
            type="text"
            placeholder="Enter your location"
            value={userLocation}
            onChange={(e) => dispatch(setUserLocation(e.target.value))}
          />
        </div>

        {/* Existing Image Upload Section */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Event Image
          </label>
          <input
            required
            className="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            name="image"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-xl focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </form>
      <Popup message={popup.message} type={popup.type} />
    </div>
  );
};

export default UserEvents;
