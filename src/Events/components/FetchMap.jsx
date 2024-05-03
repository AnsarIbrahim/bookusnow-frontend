import { APIKey } from '../../redux/baseUrl';

const fetchCoordinates = async (cityName) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      cityName
    )}.json?access_token=${APIKey}`
  );
  const data = await response.json();
  const [longitude, latitude] = data.features[0].center;
  const coordinates = {
    latitude,
    longitude,
  };
  return coordinates;
};

export default fetchCoordinates;
