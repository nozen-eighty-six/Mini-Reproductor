import { createPortal } from "react-dom";
import SeekBar from "./SeekBar";
import { useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import ArtistPlayer from "./ArtistPlayer";
import OptionsPlayer from "./OptionsPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setVolumen } from "../../redux/playBackSlice";
const MusicPlayerFooter = () => {
  const audioElement = useRef(null);
  const state = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  console.log(state);
  return createPortal(
    <footer className="music-player-footer xs:hidden lg:block bg-[#181b22] h-[100px] ">
      <div className="nav__container h-full flex justify-between items-center ">
        <ArtistPlayer
          songTitle={state.currentSong?.title || ""}
          artistName={state.currentSong?.artist || ""}
        />

        <AudioPlayer
          url={state.currentSong?.cover || ""}
          audioElement={audioElement}
        />
        <OptionsPlayer
          onSeek={(newVolume) => dispatch(setVolumen(newVolume))}
          audioElement={audioElement}
        />
      </div>
    </footer>,
    document.body
  );
};

export default MusicPlayerFooter;
