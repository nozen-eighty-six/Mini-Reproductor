const PlayListControls = () => {
  return (
    <div className="playlist__controls__container flex  justify-between items-center mb-6">
      <div className="">
        <i
          className=" ri-play-fill inline-flex justify-center items-center cursor-pointer
         bg-[#1ed760] w-[50px] h-[50px] text-2xl ps-1 rounded-full hover:bg-[#3be477] "
        >
          {" "}
        </i>
      </div>
      <button className="text-white/80 flex gap-1 hover:text-white/100">
        Lista
        <i className="ri-list-unordered "></i>
      </button>
    </div>
  );
};

export default PlayListControls;
