import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Button from "./fullscreen-button";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const [secondCount, setSecondCount] = useState(10);

  const [borderSize, setBorderSize] = useState(2);

  const [dotSize, setDotSize] = useState(4);

  // time setting
  const incSecondCount = useCallback(
    function incTime() {
      setSecondCount((current) => current + 30);
    },
    [setSecondCount],
  );
  const decSecondCount = useCallback(
    function decTime() {
      setSecondCount((current) => (current > 30 ? current - 30 : current));
    },
    [setSecondCount],
  );

  // dot size setting
  const incDotSize = useCallback(
    function () {
      setDotSize((current) => (current < 40 ? current + 2 : current));
    },
    [setDotSize],
  );
  const decDotSize = useCallback(
    function () {
      setDotSize((current) => (current > 2 ? current - 2 : current));
    },
    [setDotSize],
  );

  // border size setting
  const incBorderSize = useCallback(
    function () {
      setBorderSize((current) => (current < 10 ? current + 2 : current));
    },
    [setBorderSize],
  );
  const decBorderSize = useCallback(
    function () {
      setBorderSize((current) => (current > 0 ? current - 2 : current));
    },
    [setBorderSize],
  );

  // constant style of all buttons
  const btn = useMemo(
    () =>
      "border-white border rounded-md text-white opacity-80 px-4 py-2 transition-all",
    [],
  );

  // dynamic styles on the fly based on settings
  const getDotSize = useCallback(
    function () {
      return dotSize + "px";
    },
    [dotSize],
  );
  const getBorderSize = useCallback(
    function () {
      return borderSize + "px";
    },
    [borderSize],
  );

  const [dotPosistion, setDotPosition] = useState({ x: 50, y: 50 });
  const [isSmooth, setIsSmooth] = useState(true);

  // moving dot
  useEffect(() => {
    if (isStarted && secondCount > 0) {
      const interval = setInterval(() => {
        const rd = Math.random();
        const n = rd < 0.35 ? rd : -rd;

        const ox = dotPosistion.x;
        const oy = dotPosistion.y;

        const x = Math.random() < 0.5 ? ox + n : ox - n;
        const y = Math.random() < 0.5 ? oy + n : oy - n;

        if (x < 1 || x > 99 || y < 1 || y > 99)
          setDotPosition({ x: 50, y: 50 });
        else setDotPosition({ x, y });
      }, 1000 / 60); // 60 fps

      return () => clearInterval(interval);
    } else {
      setIsStarted(false);
    }
  }, [dotPosistion, isStarted, secondCount]);

  // work with counter
  useEffect(() => {
    if (secondCount < 1) setIsStarted(false);
  }, [secondCount]);

  useEffect(() => {
    if (isStarted && secondCount > 0) {
      const interval = setInterval(() => {
        setSecondCount((current) => current - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsStarted(false);
    }
  }, [isStarted, secondCount]);

  const toggleSmooth = useCallback(
    function () {
      return isSmooth ? "150ms" : "0ms";
    },
    [isSmooth],
  );

  // because tailwind can't use dynamic variables to we have to set style
  // despite the fact that this is not best practice
  const dotStyles: CSSProperties = {
    boxSizing: "content-box",
    backgroundColor: "red", // TODO: color picker
    borderColor: "white", // TODO: color picker
    borderStyle: "solid",
    borderWidth: getBorderSize(),
    height: getDotSize(),
    width: getDotSize(),
    top: dotPosistion.y + "%",
    left: dotPosistion.x + "%",
    transitionProperty: "all",
    transitionDuration: toggleSmooth(),
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div className="bg-gray-800 h-full flex flex-col gap-1" id="wrapper">
      <header className="flex gap-2 items-center justify-between">
        <div className="">
          <button
            type="button"
            onClick={() => setIsStarted(true)}
            className={btn + " " + (isStarted ? "opacity-30" : "")}
          >
            start
          </button>

          <button
            type="button"
            onClick={() => setIsStarted(false)}
            className={btn + " " + (isStarted ? "" : "opacity-30")}
          >
            stop
          </button>
        </div>

        <div className="">
          <button
            type="button"
            onClick={() => setIsSmooth(true)}
            className={btn + " " + (isSmooth ? "opacity-30" : "")}
          >
            smooth
          </button>

          <button
            type="button"
            onClick={() => setIsSmooth(false)}
            className={btn + " " + (isSmooth ? "" : "opacity-30")}
          >
            crazy
          </button>
        </div>

        <div className="">
          <button type="button" onClick={decBorderSize} className={btn}>
            -2
          </button>

          <span className={btn}>border: {borderSize}</span>

          <button type="button" onClick={incBorderSize} className={btn}>
            +2
          </button>
        </div>

        <div className="">
          <button type="button" onClick={decSecondCount} className={btn}>
            -30
          </button>

          <span className={btn}>time: {secondCount}</span>

          <button type="button" onClick={incSecondCount} className={btn}>
            +30
          </button>
        </div>

        <div className="">
          <button type="button" onClick={decDotSize} className={btn}>
            -2
          </button>

          <span className={btn}>dot size: {dotSize}</span>

          <button type="button" onClick={incDotSize} className={btn}>
            +2
          </button>
        </div>
      </header>

      <main className="flex-1 relative">
        <div
          style={dotStyles}
          className={`aspect-square rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-all`}
        ></div>
      </main>

      <footer className="text-center">
        <Button className={btn} />
      </footer>
    </div>
  );
}

export default App;
