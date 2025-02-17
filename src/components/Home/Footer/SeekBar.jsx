import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "../../Reusable/LoadingBar";

const SeekBar = ({ duration, currentTime, onSeek, audioElement }) => {
  const seekBarRef = useRef(0);
  const progressRef = useRef(null);
  const currentTimeP = useSelector((state) => state.playback.currentTimeP);

  const progressPercentage = (currentTime / duration) * 100;

  const handleDrag = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(Math.min(Math.max(newTime, 0), duration)); // Límite entre 0 y duración
    console.log(newTime, " ", Math.min(Math.max(newTime, 0), duration));
  };

  useEffect(() => {
    const setCurrentTime = () => {
      if (currentTimeP > 0) {
        //    console.log("estableciendo tiempo", currentTimeP);
        if (audioElement.current) {
          onSeek(currentTimeP); // Límite entre 0 y duración
        }
        seekBarRef.current = 1;
      }
    };
    setCurrentTime();
  }, [audioElement]);
  return currentTime >= 0 && duration ? (
    <div
      className={`lg:w-[400px] xl:w-[600px] h-full flex flex-col gap-1 items-center justify-center `}
    >
      {/* Barra de progreso */}
      <div
        ref={progressRef}
        className="relative w-full h-[2px] bg-gray-600 rounded cursor-pointer"
        //onMouseDown={() => setIsDragging(true)}
        //onMouseUp={() => setIsDragging(false)}
        onClick={(e) => handleDrag(e)}
      >
        <div
          className="absolute top-0 left-0 h-full bg-white rounded"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-white w-3 h-3 rounded-full"
          style={{ left: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between w-full">
        {/* Tiempo transcurrido */}

        <span className="text-sm text-gray-400 xs:hidden lg:inline">
          {formatTime(currentTime)}
        </span>

        {/* Tiempo total */}
        <span className="text-sm text-gray-400 xs:hidden lg:inline">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  ) : (
    <LoadingBar />
  );
};

// Formatea el tiempo en mm:ss
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default SeekBar;
