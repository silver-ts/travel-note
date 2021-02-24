import axios from 'axios';

/**
 * Get all log entries from the database
 */
export const getLogEntriesList = async () => await axios.get('/api/logs/');

/**
 *
 * @param {*} entry
 */
export const createLogEntry = async entry => await axios.post('/api/logs', entry);
