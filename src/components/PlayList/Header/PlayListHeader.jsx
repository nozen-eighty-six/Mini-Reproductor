import { useEffect, useState } from "react";
import { getNumberOfSongs } from "../../../services/indexedDBController";

const PlayListHeader = ({ update }) => {
  const [songs, setSongs] = useState(null);
  const setNumberOfSongs = async () => {
    try {
      const numberOfSongs = await getNumberOfSongs();
      setSongs(numberOfSongs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setNumberOfSongs();
  }, []);

  useEffect(() => {
    if (update) {
      setNumberOfSongs();
    }
  }, [update]);
  return (
    <div
      className="play__list__header__container px-4 py-4
     flex  justify-start items-center gap-4 xs:rounded-none lg:rounded-tl-xl lg:rounded-tr-xl"
    >
      <div
        className="play__list__icon__container w-40 h-40 flex justify-center items-center rounded-md
        xs:hidden lg:flex
      "
      >
        <i className="ri-heart-fill text-white text-6xl"></i>
      </div>

      <div className="play__list__header__text__container flex flex-col text-white">
        <span className="text-[clamp(0.875rem,1.5vw,1rem)]">Playlist</span>
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold">
          Tus canciones
        </h2>
        <span className="clamp(0.875rem,1.5vw,1rem)">
          <a
            href=""
            className="font-semibold hover:underline hover:decoration-solid"
          >
            Edgar
          </a>{" "}
          •{" "}
          {songs && (
            <span
              className="text-white/80 playlist-animate-fadeInUp"
              onAnimationEnd={(e) =>
                e.target.classList.remove("playlist-animate-fadeInUp")
              }
            >
              {songs}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default PlayListHeader;
