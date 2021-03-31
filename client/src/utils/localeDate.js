/**
 * Format date string to display "yyyy-mm-dd"
 * NOTE: use it for form date input
 * @param {string} date
 */
export const formattedDate = date => new Date(date).toISOString().split('T')[0];

/**
 * Format date string to display "Feb 10, 2021"
 * @param {string} date
 */
export const localeDate = date => new Date(date).toLocaleString('en-us', {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
});
