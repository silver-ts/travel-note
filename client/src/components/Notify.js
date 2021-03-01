import toast from 'react-hot-toast';

const DARK_THEME_STYLE = {
  style: {
    borderRadius: '10px',
    background: '#292930',
    color: '#fff',
    fontSize: '1rem',
  },
};

/**
 * Show popup with success message
 * @param {string} message
 */
const notifySuccess = message => toast.success(message, {
  ...DARK_THEME_STYLE,
  duration: 4000,
});

/**
 * Show popup with error message
 * @param {string} message
 */
const notifyFailure = message => toast.error(message, {
  ...DARK_THEME_STYLE,
  duration: 4000,
});

export { notifySuccess, notifyFailure };
