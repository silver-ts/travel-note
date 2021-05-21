import { useEffect } from 'react';

/**
 * Perform an action on pressing key
 * Guide: https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/
 *
 * @param {string} key - the name of the key to respond to
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key, action) {
  useEffect(() => {
    const onKeyup = e => {
      if (e.key === key) {
        action();
      };
    };

    window.addEventListener('keyup', onKeyup);

    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
}
