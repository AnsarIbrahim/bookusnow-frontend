import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaArrowRightLong, FaLocationDot } from 'react-icons/fa6';

import { fetchUpcomeEvents } from '../../redux/events/upcomeEventSlice';
import { serverUrl } from '../../redux/baseUrl';
import fetchCoordinates from '../components/FetchMap';
import EventMapModal from '../components/EventMapModal';

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector(
    (state) => state.upcomingEventsData.upcomingEventsData
  );

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const closeMapHandler = () => setShowMap(false);

  useEffect(() => {
    dispatch(fetchUpcomeEvents());
  }, [dispatch]);

  const serverBaseUrl = serverUrl;

  const handleCityClick = async (event) => {
    const coordinates = await fetchCoordinates(event.cityName);
    const selectedEvent = { ...event, ...coordinates };
    setSelectedEvent(selectedEvent);
    setShowMap(true);
  };

  return (
    <div className="pt-72">
      <div className="p-10">
        <p className="flex font-inter items-center gap-x-3 text-black font-semibold text-xs md:text-base text-left lg:pl-24">
          Upcoming events <FaArrowRightLong className="text-black" />
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-32 px-10">
        {events &&
          events.map((event, index) => (
            <motion.div
              key={index}
              className="font-inter font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={`${serverBaseUrl}${event.imgUrl}`}
                    alt={event.eventName}
                    className="w-full h-80 object-cover rounded-3xl p-2"
                  />
                  <div className="absolute bottom-2 rounded-b-2xl bg-black opacity-60 w-[95%] left-2">
                    <p className="text-xs p-2 py-3 text-white">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-900 text-base pb-2">
                    {event.eventName}
                  </p>
                  <div className="flex items-center justify-between text-stroke">
                    <p
                      className="text-xs flex gap-1 items-center justify-center cursor-pointer"
                      onClick={() => handleCityClick(event)}
                    >
                      <FaLocationDot className="text-sm" />
                      {event.cityName}
                    </p>

                    <p className="text-xs">
                      {event.weather} |{' '}
                      <span>{Math.floor(event.distanceKm)} Km</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        {selectedEvent && (
          <EventMapModal
            selectedEvent={selectedEvent}
            showMap={showMap}
            closeMapHandler={closeMapHandler}
          />
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
