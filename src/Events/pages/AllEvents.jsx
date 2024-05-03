import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong } from 'react-icons/fa6';

import { fetchEvents } from '../../redux/events/eventsSlice';
import { serverUrl } from '../../redux/baseUrl';
import EventMapModal from '../components/EventMapModal';
import EventCard from '../components/EventCard';
import fetchCoordinates from '../components/FetchMap';

const AllEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const scrollContainer = useRef(null);

  const closeMapHandler = () => setShowMap(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const serverBaseUrl = serverUrl;

  const handleMouseDown = (e) => {
    setIsScrolling(true);
    setScrollStart(e.pageX);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (isScrolling) {
      scrollContainer.current.scrollLeft += scrollStart - e.pageX;
      setScrollStart(e.pageX);
    }
  };

  const handleCityClick = async (event) => {
    const coordinates = await fetchCoordinates(event.cityName);
    const selectedEvent = { ...event, ...coordinates };
    setSelectedEvent(selectedEvent);
    setShowMap(true);
  };

  return (
    <>
      <div className="w-[100%]">
        <div className="flex items-center justify-between lg:p-10 p-4">
          <p className="md:text-base text-xs font-bold text-left text-white flex items-center gap-x-5 font-inter">
            Recommended shows <FaArrowRightLong className="text-white" />
          </p>
          <p className="text-white md:text-base text-xs underline font-inter font-semibold">
            see all
          </p>
        </div>
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-x-3 pl-10 pr-4 lg:pl-32"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              handleCityClick={handleCityClick}
              serverBaseUrl={serverBaseUrl}
            />
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
    </>
  );
};

export default AllEvents;
