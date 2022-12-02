import { useCallback, useContext } from 'react';

import { TrackerContext } from '../context/tracker';

function useTracker() {
  const tracker = useContext(TrackerContext);

  const setUserId = useCallback(
    (userId) => {
      tracker.setUserId(userId);
    },
    [tracker]
  );

  const event = useCallback(
    (name, props) => {
      return tracker.event(name, props);
    },
    [tracker]
  );

  const eventWithTimeout = useCallback(
    (name, props, timeout) => {
      return tracker.eventWithTimeout(name, props, timeout);
    },
    [tracker]
  );

  return { isReady: tracker.isReady, setUserId, event, eventWithTimeout };
}

export default useTracker;
