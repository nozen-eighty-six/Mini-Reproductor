import { memo, useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setCurrentSongChanged,
  setPlaying,
} from "../../../redux/playBackSlice";
import {
  executeNextElement,
  executePreviousElement,
} from "../../../services/indexedDBController";

const MusicControls = memo(({ play, stop }) => {
  const isPlaying = useSelector(
    (state) => state.playback.isPlaying,
    shallowEqual
  );
  const dispatch = useDispatch();
  const handlePlay = useCallback(() => {
    dispatch(setPlaying(!isPlaying));
  }, [isPlaying, dispatch]);

  const nextSong = useCallback(async () => {
    await executeNextElement();
    dispatch(setCurrentSongChanged(true));
  }, []);

  const previousSong = useCallback(async () => {
    await executePreviousElement();
    dispatch(setCurrentSongChanged(true));
  }, []);

  return (
    <div className="music__controls w-max text-white relative z-50 flex justify-between items-center gap-3 ">
      <i
        className="ri-skip-back-line xs:hidden lg:inline "
        onClick={previousSong}
      ></i>
      <button onClick={handlePlay} className="relative z-50">
        {isPlaying ? (
          <i
            className="ri-pause-line inline-flex justify-center items-center bg-[#57585d] w-[45px] h-[45px] rounded-full  "
            onClick={stop}
          ></i>
        ) : (
          <i
            className=" ri-play-line inline-flex justify-center items-center bg-[#57585d] w-[45px] h-[45px] ps-1 rounded-full  "
            onClick={play}
          >
            {" "}
          </i>
        )}
      </button>
      <i
        className="ri-skip-forward-line xs:hidden lg:inline "
        onClick={nextSong}
      ></i>
    </div>
  );
});

MusicControls.displayName = "MusicControls";
export default MusicControls;
