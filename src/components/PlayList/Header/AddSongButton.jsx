const AddSongButton = ({ handleInputChange }) => {
  return (
    <div className="nav__item bg-[#181b22]">
      <input
        type="file"
        id="file"
        onChange={handleInputChange}
        className="hidden"
        multiple
        accept=".mp3,.wav,.ogg"
      />
      <button
        className="nav__link xs:inline-flex xs:flex-col xs:justify-center lg:flex-row lg:justify-normal w-full h-full"
        type="button"
        onClick={() => document.getElementById("file").click()}
      >
        <i className="ri-music-line text-white"></i>
        <span className="text-white lg:inline">Agregar</span>
      </button>
    </div>
  );
};

export default AddSongButton;
