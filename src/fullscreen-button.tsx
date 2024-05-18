import { useState, useEffect } from "react";

const FullscreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const onFullScreenChange = () => {
      setIsFullScreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  };

  const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
  };

  return (
    <button onClick={toggleFullScreen}>
      {isFullScreen ? "Exit Full Screen" : "Go Full Screen"}
    </button>
  );
};

export default FullscreenButton;
