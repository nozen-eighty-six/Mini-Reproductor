import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLoopP, setVolumen } from "../../../redux/playBackSlice";
import { memo, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const OptionsPlayer = memo(({ audioElement }) => {
  const progressRef = useRef(null);
  const VOLUME_MAX = 1;

  const loop = useSelector((state) => state.playback.loop, shallowEqual);
  const volume = useSelector((state) => state.playback.volume, shallowEqual);
  const loopIcon = loop ? "ri-repeat-one-line" : "ri-repeat-2-line";
  const dispatch = useDispatch();
  const progressPercentage = (volume / VOLUME_MAX) * 100;

  const handleLoop = useCallback(() => {
    dispatch(setLoopP(!loop));
  }, [dispatch, loop]);

  const handleDrag = useCallback(
    (e) => {
      /*getBoundingClientRect() es un método que devuelve las dimensiones y posiciones del elemento 
      con relación con el navegador. Devolverá un objeto
    */
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * VOLUME_MAX;
      const clampedVolumen = Math.min(Math.max(newTime, 0), VOLUME_MAX);
      dispatch(setVolumen(clampedVolumen)); // Límite entre 0 y duración
      audioElement.current.volume = Math.min(Math.max(newTime, 0), VOLUME_MAX);
    },
    [dispatch]
  );

  const handleMouseMove = useCallback(
    (e) => {
      handleDrag(e);
    },
    [handleDrag]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  // Método para calcular la posición al hacer clic en la línea de duración del audio
  const handleClick = (e) => {
    console.log("click");
    handleDrag(e); // Llama al mismo método para calcular la posición al hacer clic
  };

  return (
    <div className="other__options text-white flex gap-5 h-full items-center">
      {/*
      <i className="ri-heart-line"></i>
        
        */}{" "}
      <i className="ri-shuffle-line lg:text-sm  xl:text-base"></i>
      <i
        className={`${loopIcon} lg:text-sm  xl:text-base`}
        onClick={handleLoop}
      ></i>
      <div className="flex items-center w-[130px] gap-2">
        <i className="ri-volume-up-line lg:text-sm  xl:text-base"></i>
        <div
          className="relative proggres__bar h-[2px] bg-gray-600 rounded cursor-pointer"
          ref={progressRef}
          onClick={handleClick}
        >
          <div
            className="absolute top-0 left-0 h-full bg-white rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div
            className="absolute bg-white w-3 h-3 top-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${progressPercentage}%` }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      </div>
    </div>
  );
});

OptionsPlayer.displayName = "OptionsPlayer";
OptionsPlayer.propTypes = {
  // onSeek: PropTypes.func.isRequired,
  audioElement: PropTypes.object.isRequired,
};

export default OptionsPlayer;
