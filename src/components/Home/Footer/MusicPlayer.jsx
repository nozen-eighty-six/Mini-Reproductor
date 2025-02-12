import { useEffect, useRef } from "react";
import ArtistPlayer from "./ArtistPlayer";
import AudioPlayer from "./AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongChanged } from "../../../redux/playBackSlice";
import { useCurrentSong } from "../../../hooks/useCurrentSong";

const MusicPlayer = () => {
  const audioElement = useRef(null);
  const { currentSongChanged } = useSelector((state) => state.playback);
  const { getCurrentSong, currentSong } = useCurrentSong();
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentSong();
  }, []);

  useEffect(() => {
    if (currentSongChanged) {
      getCurrentSong();
      dispatch(setCurrentSongChanged(false));
    }
  }, [currentSongChanged]);

  return (
    <div
      id="music-player"
      className="music-player xs:block lg:hidden bg-[#044163]  xs:relative  w-[90%] mx-auto px-3 rounded-md"
    >
      <div className="nav__container h-full flex  justify-between items-center ">
        <ArtistPlayer
          songTitle={currentSong.title || ""}
          artistName={currentSong.artist || ""}
        />

        <AudioPlayer
          url={currentSong.cover || ""}
          audioElement={audioElement}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
