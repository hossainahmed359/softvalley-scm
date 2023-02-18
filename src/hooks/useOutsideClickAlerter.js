import { useEffect } from 'react';

export const useOutsideClickAlerter = (ref, handler, ids) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const outsideIds = ids
        .map((id) => document.getElementById(id)?.contains(event.target))
        .includes(true);
      if (ref.current && !ref.current.contains(event.target) && !outsideIds) {
        handler?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, ids]);
};