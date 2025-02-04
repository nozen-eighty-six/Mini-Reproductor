import { createPortal } from "react-dom";
import SeekBar from "./SeekBar";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import ArtistPlayer from "./ArtistPlayer";
import OptionsPlayer from "./OptionsPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setVolumen } from "../../redux/playBackSlice";
import { getCurrentMp3FromIndexedDB } from "../../services/indexedDBController";
const MusicPlayerFooter = () => {
  const audioElement = useRef(null);
  const [currentSong, setCurrentSong] = useState({});

  const dispatch = useDispatch();
  const currentWidth = window.innerWidth;

  useEffect(() => {
    const getCurrentSong = async () => {
      const song = await getCurrentMp3FromIndexedDB(1);
      setCurrentSong(song);
    };
    getCurrentSong();
  }, []);
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
            <OptionsPlayer
              onSeek={(newVolume) => dispatch(setVolumen(newVolume))}
              audioElement={audioElement}
            />
          </div>
        </>
      )}
    </footer>,
    document.body
  );
};

export default MusicPlayerFooter;
