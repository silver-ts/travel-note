/**
 * Format date string to display
 * @param {string} date
 */
export const localeDate = date => new Date(date).toLocaleDateString('en-US');
