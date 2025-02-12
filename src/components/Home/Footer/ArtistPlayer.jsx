import PropTypes from "prop-types";
const ArtistPlayer = ({ songTitle, artistName }) => {
  return (
    <div
      className="artist__container flex  gap-4 playlist-animate-fadeInUp"
      onAnimationEnd={(e) =>
        e.target.classList.remove("playlist-animate-fadeInUp")
      }
    >
      <img
        src="../../../public/Images/light-two-fingers.jpg"
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
};

ArtistPlayer.propTypes = {
  songTitle: PropTypes.string,
  artistName: PropTypes.string,
};

export default ArtistPlayer;
