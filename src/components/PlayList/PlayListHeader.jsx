const PlayListHeader = () => {
  return (
    <div
      className="play__list__header__container px-4 py-4
     flex  justify-start items-center gap-4 rounded-tl-xl rounded-tr-xl"
    >
      <div className="play__list__icon__container w-40 h-40 flex justify-center items-center rounded-md">
        <i className="ri-heart-fill text-white text-6xl"></i>
      </div>
      <div className="play__list__header__text__container flex flex-col text-white">
        <span className="text-sm">Playlist</span>
        <span className="text-6xl font-bold">Tus canciones</span>
        <span>
          <a
            href=""
            className="font-semibold hover:underline hover:decoration-solid"
          >
            Edgar
          </a>{" "}
          - <span className="text-white/80">Number of songs</span>
        </span>
      </div>
    </div>
  );
};

export default PlayListHeader;
