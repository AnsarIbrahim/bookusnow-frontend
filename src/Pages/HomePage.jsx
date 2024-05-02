import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../Shared/Components/LoadingSpinner/LoadingSpinner';
import Header from './Header/Header';
import Banner from '../assests/Banner.svg';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Header />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="flex items-center justify-center pt-5 relative h-screen">
        <img
          src={Banner}
          alt="banner"
          className="w-full object-cover h-[100%] opacity-95 outline-stroke pt-5"
        />
        <div className="absolute transform text-center">
          <h1 className="md:text-6xl font-bold text-white font-inter text-2xl p-5 md:p-0">
            Discover Exciting Events Happening <br /> Near You - Stay Tuned for
            Updates!
          </h1>
          <p className="md:text-xl text-white text-sm font-inter font-semibold px-20 md:px-0">
            Explore local happenings, from concerts to food festivals. <br />
            Join the community and make unforgettable memories.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
