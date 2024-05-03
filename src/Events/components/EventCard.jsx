import React from 'react';
import { motion } from 'framer-motion';
import { FaLocationDot } from 'react-icons/fa6';

const EventCard = ({ event, handleCityClick, serverBaseUrl }) => (
  <motion.div
    key={event.id}
    className="relative flex-none"
    initial={{ x: 500, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 2 }}
  >
    {event.image ? (
      <img
        src={`data:image/jpeg;base64,${event.image}`}
        className="w-56 h-80 object-cover rounded-xl shadow-lg"
        alt={event.eventName}
      />
    ) : event.imgUrl ? (
      <img
        src={`${serverBaseUrl}${event.imgUrl}`}
        alt={event.eventName}
        className="w-full h-80 object-cover rounded-xl shadow-lg"
      />
    ) : null}
    <div className="absolute bottom-2 p-2 text-stroke flex flex-col font-inter w-full">
      <div className="flex justify-between items-center pb-2">
        <p className="text-sm">
          {event.eventName.split(' ').slice(0, 2).join(' ')}
        </p>
        <p className="text-xxs">
          {new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p
          className="text-xxs flex gap-1 items-center justify-center cursor-pointer"
          onClick={() => handleCityClick(event)}
        >
          <FaLocationDot className="text-gray-400" />
          {event.cityName}
        </p>

        <p className="text-xxs">
          {event.weather} | <span>{Math.floor(event.distanceKm)} Km</span>
        </p>
      </div>
    </div>
  </motion.div>
);

export default EventCard;
