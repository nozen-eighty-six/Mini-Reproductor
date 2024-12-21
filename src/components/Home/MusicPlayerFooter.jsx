import { createPortal } from "react-dom";
import SeekBar from "./SeekBar";
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import ArtistPlayer from "./ArtistPlayer";
import OptionsPlayer from "./OptionsPlayer";
const MusicPlayerFooter = () => {
  return createPortal(
    <footer className="music-player-footer bg-[#181b22] h-[100px] ">
      <div className="nav__container h-full flex justify-between items-center ">
        <ArtistPlayer />

        <AudioPlayer />
        <OptionsPlayer />
      </div>
    </footer>,
    document.body
  );
};

export default MusicPlayerFooter;
