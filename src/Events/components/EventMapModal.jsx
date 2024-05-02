import React from 'react';

import Map from '../../Shared/Components/Map/Map';
import Modal from '../../Shared/Components/Modal/Modal';
import Button from '../../components/Button';

const EventMapModal = ({ selectedEvent, showMap, closeMapHandler }) => (
  <Modal
    onClose={closeMapHandler}
    show={showMap}
    header={selectedEvent.cityName}
    onCancel={closeMapHandler}
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
      <Map
        center={{
          lat: selectedEvent.latitude,
          lng: selectedEvent.longitude,
        }}
        zoom={10}
      />
    </div>
  </Modal>
);

export default EventMapModal;
