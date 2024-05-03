import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';

import NavBar from '../NavLinks/NavBar';
import Map from '../../Shared/Components/Map/Map';
import Modal from '../../Shared/Components/Modal/Modal';
import Button from '../../components/Button';
import headerLinks from '.';
import './header.css';

const Header = () => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  return (
    <div className="bg-background fixed w-full z-10 pb-3">
      <NavBar />
      <div className="flex items-center justify-start px-10 w-full">
        <div className="">
          <p
            className="hidden md:flex items-center justify-center text-xs font-inter font-medium text-slate-500 gap-2 cursor-pointer hover:text-red-500 transition-colors duration-200"
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
        <div className="flex items-center justify-center md:w-[75%] overflow-x-auto scrollbar-hide">
          <ul className="flex items-center justify-center md:gap-5 gap-7 text-xs md:text-sm text-center font-inter whitespace-nowrap pl-44 md:pl-0">
            {headerLinks.map((link, index) => (
              <li key={index} className="hover:text-blue-500">
                <a href={link.url} className="font-inter">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
