import { useState } from "react";
import { getCurrentMp3FromIndexedDB } from "../services/indexedDBController";

export const useCurrentSong = () => {
  const [currentSong, setCurrentSong] = useState({});
  const getCurrentSong = async () => {
    const song = await getCurrentMp3FromIndexedDB("current");
    console.log(song);
    setCurrentSong(song);
  };

  return { getCurrentSong, currentSong };
};
