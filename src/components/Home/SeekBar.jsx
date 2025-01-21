import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

const SeekBar = ({ duration, currentTime, onSeek, audioElement }) => {
  const seekBarRef = useRef(0);
  console.log("SeekBar ");
  //const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef(null);
  const { currentTimeP } = useSelector((state) => state.playback);
  // Calcula el porcentaje del progreso actual
  /*(if (currentTimeP > 0) {
    currentTime = currentTimeP;
  }

  const progressPercentage =
    currentTime != 0
      ? (currentTimeP / duration) * 100
      : (currentTime / duration) * 100;
*/

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

  return (
    <div className=" w-[600px] h-full flex flex-col gap-1 items-center justify-center  ">
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

        <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>

        {/* Tiempo total */}
        <span className="text-sm text-gray-400">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// Formatea el tiempo en mm:ss
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default SeekBar;
