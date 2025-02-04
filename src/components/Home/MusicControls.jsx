import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlaying } from "../../redux/playBackSlice";

const MusicControls = memo(({ play, stop }) => {
  const { isPlaying } = useSelector((state) => state.playback);
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setPlaying(!isPlaying));
  };
  return (
    <div className="music__controls w-max text-white relative z-50 flex justify-between items-center gap-3 ">
      <i className="ri-skip-back-line xs:hidden lg:inline "></i>
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
      <i className="ri-skip-forward-line xs:hidden lg:inline "></i>
    </div>
  );
});

MusicControls.displayName = "MusicControls";
export default MusicControls;
