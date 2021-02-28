import axios from 'axios';

/**
 * Get all log entries from the database
 */
export const getLogEntriesList = async () => await axios.get('/api/logs/');

/**
 * Create a new log entry
 * @param {*} entry - entry data
 */
export const createLogEntry = async entry => await axios.post('/api/logs', entry);

/**
  * Get location from the Mapbox Geocoding API
  * @param {number} longitude
  * @param {number} latitude
  */
export const getEntryLocation = async (longitude, latitude) => {
  // Read more: https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding
  const path = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const filters = 'types=country,place&';
  const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const res = await axios.get(`${path}${longitude},${latitude}.json?${filters}access_token=${token}`);
  console.log(res);

  // Format response to return place name and country
  const data = res.data.features.reduce((location, item) => {
    const name = item.place_type[0];
    const value = item.text;

    location[name] = value;
    return location;
  }, {});

  // Check if object is empty
  if (Object.keys(data).length === 0) {
    return null;
  }

  return data;
};
