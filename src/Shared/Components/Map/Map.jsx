import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import './Map.css';
import { APIKey } from '../../../redux/BaseUrl';

mapboxgl.accessToken = APIKey;

const Map = (props) => {
  const mapContainerRef = useRef(null);
  const { center, zoom } = props;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // or any other style
      center: [center.lng, center.lat], // note the order: longitude, latitude
      zoom: zoom,
    });

    new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(map);

    // Clean up on unmount
    return () => map.remove();
  }, [center, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Map;
