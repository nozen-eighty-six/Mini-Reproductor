import { useDispatch, useSelector } from "react-redux";
import { setLoopP } from "../../redux/playBackSlice";
import { useRef } from "react";
import PropTypes from "prop-types";
const OptionsPlayer = ({ onSeek, audioElement }) => {
  console.log("OptionsPlayer ");
  const progressRef = useRef(null);
  const volumentTotalRef = useRef(1);
  const { loop, volume } = useSelector((state) => state.playback);
  const dispatch = useDispatch();
  const progressPercentage = (volume / volumentTotalRef.current) * 100;

  const handleLoop = () => {
    dispatch(setLoopP(!loop));
  };

  const handleDrag = (e) => {
    /*getBoundingClientRect() es un método que devuelve las dimensiones y posiciones del elemento 
      con relación con el navegador. Devolverá un objeto
    */
    const rect = progressRef.current.getBoundingClientRect();
    console.log(rect);
    console.log(e.clientX);
    const offsetX = e.clientX - rect.left;
    console.log(offsetX);
    const newTime = (offsetX / rect.width) * volumentTotalRef.current;
    console.log(newTime);
    console.log(Math.min(Math.max(newTime, 0), volumentTotalRef.current));
    onSeek(Math.min(Math.max(newTime, 0), volumentTotalRef.current)); // Límite entre 0 y duración
    audioElement.current.volume = Math.min(
      Math.max(newTime, 0),
      volumentTotalRef.current
    );
  };

  const handleMouseDown = () => {
    /*Código a ejecutar cuando se mueva el mouse (en este caso deslizar) */
    const handleMouseMove = (e) => {
      handleDrag(e);
    };

    /*Código a ejecutar cuando se deje manejar el mouse */
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    /*Agregamos los eventos con sus métodos respectivos al lanzarse los eventos
      cuando se mueva el mouse y cuando se deje de manejar el mouse se removerá los eventos
    */
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Método para calcular la posición al hacer clic
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
      {!loop ? (
        <i
          className="ri-repeat-2-line lg:text-sm  xl:text-base"
          onClick={handleLoop}
        ></i>
      ) : (
        <i
          className="ri-repeat-one-line lg:text-sm  xl:text-base"
          onClick={handleLoop}
        ></i>
      )}{" "}
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
};

OptionsPlayer.propTypes = {
  onSeek: PropTypes.func.isRequired,
  audioElement: PropTypes.object.isRequired,
};

export default OptionsPlayer;
