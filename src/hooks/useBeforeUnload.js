import { useRef, useEffect } from 'react';

export default function useBeforeUnload(handler) {
  useEffect(() => {
    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  });
}
