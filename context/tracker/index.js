
import { createContext, useCallback, useEffect, useState } from 'react';

const clevertapId = process.env.NEXT_PUBLIC_CT_ID;
export const TrackerContext = createContext({});

function TrackerProvider({ children }) {
  const [clevertap, setClevertap] = useState();
  const [isReady, setIsReady] = useState(false);

  // Set user id
  const setUserId = useCallback((userId) => {
    clevertap.profile.push({ Site: { Identity: userId } });
  }, [clevertap]);

  // Event
  const event = useCallback((name, props = {}) => {
    console.log(`event ${name}:`, props);
    clevertap.event.push(name, props);
  }, [clevertap]);

  // Event with timeout
  const eventWithTimeout = useCallback(
    (name, props = {}, timeout = 5000) => {
      return new Promise((resolve, reject) => {
        let timeoutId = setTimeout(() => {
          resolve({
            code: 408,
            event: {},
            message: 'Timeout',
          });
        }, timeout);

        event(name, props).then((res) => {
          if (res.code === 200) {
            clearTimeout(timeoutId);
            resolve(res);
          }
        });
      });
    },
    [event]
  );

  // Clevertap initialization
  useEffect(() => {
    const initialize = async function () {
      const ct = await import('clevertap-web-sdk');

      const clevertapInstance = ct.default;
      setClevertap(clevertapInstance);
    };
    initialize();
  }, []);

  // Tracker initialization
  useEffect(() => {
    if (clevertap && !isReady) {
      clevertap.init(clevertapId);
      clevertap.spa = true;

      setIsReady(true);
    }
  }, [isReady, clevertap]);

  const trackerContextValue = { isReady, setUserId, event, eventWithTimeout };

  return (
    <TrackerContext.Provider value={trackerContextValue}>
      {children}
    </TrackerContext.Provider>
  );
}

export default TrackerProvider;
