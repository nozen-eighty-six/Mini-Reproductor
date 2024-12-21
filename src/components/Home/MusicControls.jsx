import { memo, useState } from "react";

const MusicControls = memo(({ play, stop }) => {
  console.log("MusicControls render");
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="music__controls w-max text-white  flex justify-between items-center gap-3 ">
      <i className="ri-skip-back-line "></i>
      <button onClick={handlePlay}>
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
      <i className="ri-skip-forward-line "></i>
    </div>
  );
});

MusicControls.displayName = "MusicControls";
export default MusicControls;
