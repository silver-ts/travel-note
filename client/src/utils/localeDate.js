/**
 * Format date string to display "yyyy-mm-dd"
 * NOTE: use it for form date input
 * @param {string} date
 */
export const formattedDate = date => new Date(date).toISOString().split('T')[0];

/**
 * Format date string to display "dd/mm/yyyy"
 * @param {string} date
 */
export const localeDate = date => new Date(date).toLocaleDateString('fr-FR');
