import { useEffect, useRef, useState } from "react";
import ArtistPlayer from "./ArtistPlayer";
import AudioPlayer from "./AudioPlayer";
import { getCurrentMp3FromIndexedDB } from "../../services/indexedDBController";

const MusicPlayer = () => {
  const audioElement = useRef(null);

  const [currentSong, setCurrentSong] = useState({});

  useEffect(() => {
    const getCurrentSong = async () => {
      const song = await getCurrentMp3FromIndexedDB(1);
      setCurrentSong(song);
    };
    getCurrentSong();
  }, []);

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
