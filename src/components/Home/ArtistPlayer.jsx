import PropTypes from "prop-types";
const ArtistPlayer = ({ songTitle, artistName }) => {
  console.log("ArtistPlayer ");
  return (
    <div className="artist__container flex  gap-4">
      <img
        src="../../../public/Images/light-two-fingers.jpg"
        alt="artist__img"
        className="artist__img h-[50px] w-[50px] rounded-full"
      />
      <div className="artist__info flex flex-col">
        <span className="song__name text-white text-base font-bold">
          {songTitle || ""}
        </span>
        <span className="artist__name text-white/70 text-sm">
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
