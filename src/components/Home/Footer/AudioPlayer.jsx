import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentSongChanged,
  setCurrentTimeP,
  setDurationP,
} from "../../../redux/playBackSlice";
import PropTypes from "prop-types";
import MusicControls from "./MusicControls";
import SeekBarResponsive from "./SeekBarResponsive";
import SeekBar from "./SeekBar";
import { executeNextElement } from "../../../services/indexedDBController";
//Evitar renderizado innecesario si no cambian las props
const AudioPlayer = memo(({ url, audioElement }) => {
  console.log("AudioPlayer");
  const [userInteracted, setUserInteracted] = useState(false);

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const loop = useSelector((state) => state.playback.loop);
  const currentSongChanged = useSelector(
    (state) => state.playback.currentSongChanged
  );
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTimeRef = useRef(0);

  //Cada vez que cambie el tiempo del audio, auto se actualiza el tiempo actual
  const handleTimeUpdate = () => {
    const newTime = audioElement.current.currentTime;

    if (Math.abs(newTime - currentTimeRef.current) > 0.1) {
      // El cambio de tiempo es mayor a 0.1
      currentTimeRef.current = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleNextSong = async () => {
    try {
      await executeNextElement();
      dispatch(setCurrentSongChanged(true));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioElement.current) {
      const duration = audioElement.current.duration;
      setDuration(duration);
      dispatch(setDurationP(duration)); // Usamos la acción del slice
    }
  };

  const play = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.play();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.pause();
    }
  }, []);

  const handlePause = () => {
    const currentTime = audioElement.current.currentTime;
    dispatch(setCurrentTimeP(currentTime)); // Usamos la acción del slice
  };

  useEffect(() => {
    const handleCurrentWidth = () => setCurrentWidth(window.innerWidth);
    window.addEventListener("resize", handleCurrentWidth);
    const handleUserInteracted = () => setUserInteracted(true);
    window.addEventListener("click", handleUserInteracted, { once: true });

    return () => {
      window.removeEventListener("resize", handleCurrentWidth);
      window.removeEventListener("click", handleUserInteracted);
    };
  }, []);

  useEffect(() => {
    if (url && userInteracted) {
      console.log("Cambio de url");
      play();
    }
  }, [url]);

  return (
    <>
      <div
        id="audio-player"
        className="audio-player  flex flex-col items-center gap-2"
      >
        <MusicControls play={play} stop={stop} />

        <audio
          className="hidden"
          ref={audioElement}
          src={`${url}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls
          onPause={handlePause}
          onEnded={handleNextSong}
          loop={loop}
        ></audio>
        {currentWidth < 1024 ? (
          <SeekBarResponsive
            duration={duration}
            currentTime={currentTime}
            audioElement={audioElement}
            onSeek={(newTime) => (audioElement.current.currentTime = newTime)}
          />
        ) : (
          <SeekBar
            duration={duration}
            currentTime={currentTime}
            audioElement={audioElement}
            onSeek={(newTime) => (audioElement.current.currentTime = newTime)}
          />
        )}
      </div>
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";
AudioPlayer.propTypes = {
  url: PropTypes.string,
  audioElement: PropTypes.object,
};

export default AudioPlayer;
