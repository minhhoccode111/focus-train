import { useState, useEffect } from "react";

type FullscreenButtonPropsType = {
  className: string;
};

const FullscreenButton = ({ className }: FullscreenButtonPropsType) => {
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
    <button
      type="button"
      onClick={toggleFullScreen}
      className={className + " " + (isFullScreen ? "hidden" : "")}
    >
      {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
    </button>
  );
};

export default FullscreenButton;
