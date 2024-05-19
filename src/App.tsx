import Button from "./fullscreen-button";
import { useCallback, useState } from "react";

function App() {
  // some setting

  const [isBorder, setIsBorder] = useState(false);

  const [isStarted, setIsStarted] = useState(false);

  const [secondCount, setSecondCount] = useState(30);

  const [borderSize, setBorderSize] = useState(0);

  const [dotSize, setDotSize] = useState(1);

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

  const incDotSize = useCallback(
    function () {
      setDotSize((current) => (current < 20 ? ++current : current));
    },
    [setDotSize],
  );

  const decDotSize = useCallback(
    function () {
      setDotSize((current) => (current > 1 ? --current : current));
    },
    [setDotSize],
  );

  const incBorderSize = useCallback(
    function () {
      setBorderSize((current) => (current < 5 ? ++current : current));
    },
    [setBorderSize],
  );

  const decBorderSize = useCallback(
    function () {
      setBorderSize((current) => (current > 0 ? --current : current));
    },
    [setBorderSize],
  );

  const btn =
    "border-white border rounded-xl text-white opacity-80 p-4 transition-all";

  const getDotSize = useCallback(
    function () {
      return dotSize + "px";
    },
    [dotSize],
  );

  // TODO: add color pickers
  // TODO: add moving dot
  // TODO: add smooth moving algorithm for the dot

  // because tailwind can't use dynamic variables to we have to set style
  // despite the fact that this is not best practice
  const dotStyles = {
    height: getDotSize(),
    width: getDotSize(),

    // TODO: add border size, border color, dot color
  };

  return (
    <div className="bg-gray-900 h-full flex flex-col gap-1" id="wrapper">
      <header className="flex gap-2 items-center justify-between">
        <div className="">
          <button
            type="button"
            onClick={() => setIsStarted(true)}
            className={btn}
          >
            start
          </button>

          <button
            type="button"
            onClick={() => setIsStarted(false)}
            className={btn}
          >
            stop
          </button>
        </div>

        <div className="">
          <button type="button" onClick={incBorderSize} className={btn}>
            border ++
          </button>

          <span className={btn}>border: {borderSize}</span>

          <button type="button" onClick={decBorderSize} className={btn}>
            border --
          </button>
        </div>

        <div className="">
          <button type="button" onClick={incSecondCount} className={btn}>
            time ++
          </button>

          <span className={btn}>time: {secondCount}</span>

          <button type="button" onClick={decSecondCount} className={btn}>
            time --
          </button>
        </div>

        <div className="">
          <button type="button" onClick={incDotSize} className={btn}>
            dot size ++
          </button>

          <span className={btn}>dot size: {dotSize}</span>

          <button type="button" onClick={decDotSize} className={btn}>
            dot size --
          </button>
        </div>
      </header>
      <main className="flex-1 relative">
        <div
          style={dotStyles}
          className={`aspect-square rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        ></div>
      </main>
      <footer className="text-center">
        <Button className={btn} />
      </footer>
    </div>
  );
}

export default App;
