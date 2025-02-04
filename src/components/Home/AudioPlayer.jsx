import { useCallback, useEffect, useRef, useState } from "react";
import SeekBar from "./SeekBar";
import MusicControls from "./MusicControls";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTimeP, setDurationP } from "../../redux/playBackSlice";
import PropTypes from "prop-types";
import SeekBarResponsive from "./SeekBarResponsive";
import { getCurrentMp3FromIndexedDB } from "../../services/indexedDBController";
const AudioPlayer = ({ url, audioElement }) => {
  const currentWidth = window.innerWidth;
  const { isPlaying, loop } = useSelector((state) => state.playback);
  const audioPlayerRef = useRef(0);
  const [currentSong, setCurrentSong] = useState({});
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const getCurrentSong = async () => {
      const song = await getCurrentMp3FromIndexedDB(1);
      setCurrentSong(song);
    };
    getCurrentSong();
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioElement.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioElement.current.duration);
    dispatch(setDurationP(audioElement.current.duration)); // Usamos la acción del slice
  };

  const play = useCallback(() => {
    if (audioElement.current !== null) {
      console.log("Función play");
      audioElement.current.play();
    }
  }, [audioElement]);

  const stop = useCallback(() => {
    if (audioElement.current !== null) {
      console.log("Función play");

      audioElement.current.pause();
    }
  }, [audioElement]);

  const handlePause = () => {
    const currentTime = audioElement.current.currentTime;
    dispatch(setCurrentTimeP(currentTime)); // Usamos la acción del slice
  };

  /* if (isPlaying && isPlaying !== null) {
    console.log("Playing");
    play();
  }*/

  useEffect(() => {
    return () => (audioPlayerRef.current = 0);
  }, []);
  return (
    <>
      <div
        id="audio-player"
        className="audio-player flex flex-col items-center gap-2"
      >
        <MusicControls play={play} stop={stop} />

        <audio
          className="hidden"
          ref={audioElement}
          src={`${url || currentSong.cover}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls
          onPause={handlePause}
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
};

AudioPlayer.propTypes = {
  url: PropTypes.string,
  audioElement: PropTypes.object,
};

export default AudioPlayer;
