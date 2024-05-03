import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../Shared/Components/LoadingSpinner/LoadingSpinner';
import Banner from '../assests/Banner.svg';
import AllEvents from '../Events/pages/AllEvents';
import UpcomingEvents from '../Events/pages/UpcomingEvents';
import './home.css';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="flex items-center justify-center relative h-screen">
        <img
          src={Banner}
          alt="banner"
          className="w-full object-cover h-[130%] opacity-95 outline-stroke pt-24"
        />
        <div className="absolute transform text-center">
          <h1 className="lg:text-6xl md:text-3xl font-bold text-white font-inter text-2xl p-5 md:p-0">
            Discover Exciting Events Happening <br /> Near You - Stay Tuned for
            Updates!
          </h1>
          <p className="lg:text-xl text-white text-sm font-inter font-semibold lg:py-2 px-20 md:px-0 md:py-5">
            Explore local happenings, from concerts to food festivals. <br />
            Join the community and make unforgettable memories.
          </p>
        </div>
        <div className="events-container">
          <AllEvents />
        </div>
      </div>
      <UpcomingEvents />
    </>
  );
};

export default HomePage;
