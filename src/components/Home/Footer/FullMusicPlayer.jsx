import musicImage from "/Images/light-two-fingers.jpg";

const FullMusicPlayer = () => {
  return (
    <section className="absolute w-full h-full bg-[#044163] p-3 z-50">
      <div className="full__music_player__container border h-full w-full">
        <div className="full__music_player__header flex justify-between items-center mb-10">
          <button className="text-4xl text-white p-2">
            <i className="ri-arrow-down-s-line"></i>
          </button>
          <h2 className="font-semibold p-2 text-white">Reproduciendo</h2>
          <button className="text-3xl text-white p-2">
            <i className="ri-more-line"></i>
          </button>
        </div>
        <div className="full__music_player__image flex items-center border border-red-600 xs:h-[420px] ">
          <img src={musicImage} alt="img" />
        </div>
      </div>
    </section>
  );
};

export default FullMusicPlayer;
