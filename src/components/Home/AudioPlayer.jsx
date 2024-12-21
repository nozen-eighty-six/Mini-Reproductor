import { useCallback, useRef, useState } from "react";
import SeekBar from "./SeekBar";
import MusicControls from "./MusicControls";
import ArtistPlayer from "./ArtistPlayer";
import OptionsPlayer from "./OptionsPlayer";

const AudioPlayer = () => {
  const audioElement = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  console.log(audioElement.current?.seekable);
  const handleTimeUpdate = () => {
    setCurrentTime(audioElement.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    setDuration(audioElement.current.duration);
  };
  const play = useCallback(() => {
    audioElement.current.play();
  }, []);
  const stop = useCallback(() => {
    audioElement.current.pause();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <MusicControls play={play} stop={stop} />

        <audio
          className="hidden"
          ref={audioElement}
          src="/songs/cactus.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          controls
        ></audio>
        <SeekBar
          duration={duration}
          currentTime={currentTime}
          onSeek={(newTime) => (audioElement.current.currentTime = newTime)}
        />
      </div>
    </>
  );
};

export default AudioPlayer;
