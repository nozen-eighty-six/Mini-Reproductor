import { createPortal } from "react-dom";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import ArtistPlayer from "./ArtistPlayer";
import OptionsPlayer from "./OptionsPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongChanged } from "../../../redux/playBackSlice";
import { getCurrentMp3FromIndexedDB } from "../../../services/indexedDBController";
//memo
const MusicPlayerFooter = () => {
  console.log("MusicPlayerFooter");

  const audioElement = useRef(null);
  const [currentSong, setCurrentSong] = useState({});
  const currentSongChanged = useSelector(
    (state) => state.playback.currentSongChanged
  );
  const dispatch = useDispatch();
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const getCurrentSong = useCallback(async () => {
    const song = await getCurrentMp3FromIndexedDB("current");
    setCurrentSong(song);
  }, []);

  useEffect(() => {
    const handleReSize = () => setCurrentWidth(window.innerWidth);
    window.addEventListener("resize", handleReSize);
    return () => window.removeEventListener("resize", handleReSize);
  }, []);

  useEffect(() => {
    if (Object.keys(currentSong).length == 0) getCurrentSong();
    if (currentSongChanged) {
      console.log("Ejecutando getCurrentSong de update");
      getCurrentSong();
      dispatch(setCurrentSongChanged(false));
    }
  }, [currentSongChanged]);

  return createPortal(
    <footer className="music-player-footer xs:hidden lg:block bg-[#181b22] h-[100px] ">
      {currentWidth >= 1024 && (
        <>
          <div className="nav__container h-full flex justify-between items-center ">
            <ArtistPlayer
              songTitle={currentSong.title || ""}
              artistName={currentSong.artist || ""}
            />

            <AudioPlayer
              url={currentSong.cover || ""}
              audioElement={audioElement}
            />
            <OptionsPlayer audioElement={audioElement} />
          </div>
        </>
      )}
    </footer>,
    document.body
  );
};
export default MusicPlayerFooter;
