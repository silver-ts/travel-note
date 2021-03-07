import axios from 'axios';

/**
 * Get all log entries from the database
 */
export const getLogEntriesList = async () => await axios.get('/api/logs/');

/**
 * Create a new log entry
 * @param {object} entry - log data (LogEntry model)
 */
export const createLogEntry = async entry => await axios.post(
  '/api/logs', entry,
);

/**
  * Get location from the Mapbox Geocoding API
  * @param {number} longitude
  * @param {number} latitude
  */
export const getEntryLocation = async (longitude, latitude) => {
  // Read more: https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding
  const path = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const filters = 'types=country,place&language=en&';
  const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const response = await axios.get(
    `${path}${longitude},${latitude}.json?${filters}access_token=${token}`,
  );

  // Format response to return place name and country
  const data = response.data.features.reduce((location, item) => {
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

/**
 * Update a log entry by id
 * @param {string} id - log id
 * @param {object} data - { title, content, visitDate }
 */
export const updateLogEntry = async (id, data) => await axios.put(
  '/api/logs', { id, data },
);

/**
 * Delete log entry by id
 * @param {string} data - log id
 */
export const deleteLogEntry = async id => await axios.delete(
  '/api/logs', { data: { id } },
);
