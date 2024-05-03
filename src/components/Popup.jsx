import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const Popup = ({ message, type }) => {
  const [show, setShow] = useState(true);
  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? AiOutlineCheckCircle : AiOutlineCloseCircle;

  useEffect(() => {
    setShow(true);
  }, [message, type]);

  useEffect(() => {
    if (message && show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, show]);

  if (!show) return null;

  return (
    <div
      className={`${backgroundColor} fixed top-30 right-0 transform -translate-x-1/2 p-4 rounded-md shadow-lg text-white text-xs`}
      style={{ display: message ? 'block' : 'none' }}
    >
      <div className="flex items-center">
        <Icon className="inline-block mr-2" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
