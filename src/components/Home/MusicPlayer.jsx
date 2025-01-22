import { useRef } from "react";
import ArtistPlayer from "./ArtistPlayer";
import AudioPlayer from "./AudioPlayer";
import OptionsPlayer from "./OptionsPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setVolumen } from "../../redux/playBackSlice";

const MusicPlayer = () => {
  const audioElement = useRef(null);
  const state = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <div
      id="music-player"
      className="music-player xs:block lg:hidden bg-[#044163]  xs:relative  w-[90%] mx-auto px-3 rounded-md"
    >
      <div className="nav__container h-full flex  justify-between items-center ">
        <ArtistPlayer
          songTitle={state.currentSong?.title || ""}
          artistName={state.currentSong?.artist || ""}
        />

        <AudioPlayer
          url={state.currentSong?.cover || ""}
          audioElement={audioElement}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
