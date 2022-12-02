import { useEffect } from "react";

import TrackerProvider from "../context/tracker"
import useTracker from "../hooks/useTracker";

function MyApp({ Component, pageProps }) {
  const { isReady, setUserId } = useTracker();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const userId = '12000950';
    setUserId(userId);
  }, [isReady, setUserId]);

  return (
    <TrackerProvider>
      <Component {...pageProps} />
    </TrackerProvider>
  )
}

export default MyApp