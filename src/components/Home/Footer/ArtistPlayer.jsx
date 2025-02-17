import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import musicImage from "/Images/light-two-fingers.jpg";
const ArtistPlayer = memo(({ songTitle, artistName }) => {
  const handleAnimationEnd = useCallback((e) => {
    e.target.classList.remove("playlist-animate-fadeInUp");
  }, []);

  return (
    <div
      className="artist__container flex  gap-4 playlist-animate-fadeInUp"
      onAnimationEnd={handleAnimationEnd}
    >
      <img
        src={musicImage}
        alt="artist__img"
        className="artist__img h-[50px] w-[50px] rounded-full"
      />
      <div className="artist__info flex flex-col xs:w-[180px] md:w-[400px] lg:w-[210px] ">
        <span className="song__name text-white text-base font-bold overflow-hidden whitespace-nowrap text-ellipsis">
          {songTitle || ""}
        </span>
        <span className="artist__name text-white/70 text-sm  overflow-hidden whitespace-nowrap text-ellipsis">
          {artistName || ""}
        </span>
      </div>
    </div>
  );
});

ArtistPlayer.displayName = "ArtistPlayer";

ArtistPlayer.propTypes = {
  songTitle: PropTypes.string,
  artistName: PropTypes.string,
};

export default ArtistPlayer;
