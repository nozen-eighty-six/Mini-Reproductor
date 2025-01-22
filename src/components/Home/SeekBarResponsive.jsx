import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const SeekBarResponsive = ({ duration, currentTime, onSeek, audioElement }) => {
  const seekBarRef = useRef(0);
  console.log("SeekBar ");
  //const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef(null);
  const { currentTimeP } = useSelector((state) => state.playback);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const customContainer = document.getElementById("music-player");
    if (customContainer) {
      setContainer(customContainer); // Actualiza el estado cuando el contenedor exista
    }
  }, []);

  if (!container) {
    console.log("No container");
    return null; // No renderiza mientras no haya contenedor
  }

  const progressPercentage = (currentTime / duration) * 100;
  if (currentTimeP > 0 && audioElement.current && seekBarRef.current === 0) {
    onSeek(Math.min(Math.max(currentTimeP, 0), duration)); // Límite entre 0 y duración
    seekBarRef.current = 1;
  }

  const handleDrag = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(Math.min(Math.max(newTime, 0), duration)); // Límite entre 0 y duración
  };

  return createPortal(
    <div
      className={`  flex flex-col gap-1 items-center justify-end h-full w-[95%]  xs:absolute xs:bottom-0 xs:left-[2.5%]`}
    >
      {/* Barra de progreso */}
      <div
        ref={progressRef}
        className="relative w-full h-[2px] bg-[#747676] rounded cursor-pointer"
        //onMouseDown={() => setIsDragging(true)}
        //onMouseUp={() => setIsDragging(false)}
        onClick={(e) => handleDrag(e)}
      >
        <div
          className="absolute top-0 left-0 h-full bg-white rounded"
          style={{ width: `${progressPercentage}%` }}
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
    </div>,
    container
  );
};

// Formatea el tiempo en mm:ss
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default SeekBarResponsive;
