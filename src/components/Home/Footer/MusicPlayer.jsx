import { memo, useEffect, useRef, useState } from "react";
import ArtistPlayer from "./ArtistPlayer";
import AudioPlayer from "./AudioPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongChanged } from "../../../redux/playBackSlice";
import { useCurrentSong } from "../../../hooks/useCurrentSong";
import FullMusicPlayer from "./FullMusicPlayer";

const MusicPlayer = memo(() => {
  console.log("MusicPlayer");
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const audioElement = useRef(null);
  const currentSongChanged = useSelector(
    (state) => state.playback.currentSongChanged
  );
  const { getCurrentSong, currentSong } = useCurrentSong();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(currentSong).length == 0) getCurrentSong();
    if (currentSongChanged) {
      console.log("Ejecutando getCurrentSong de update");
      getCurrentSong();
      dispatch(setCurrentSongChanged(false));
    }
  }, [currentSongChanged]);

  return (
    <>
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
      {!showFullPlayer && <FullMusicPlayer />}
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;
