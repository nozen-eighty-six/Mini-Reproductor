import { useDispatch } from "react-redux";
import { setCurrentSongChanged, setPlaying } from "../../redux/playBackSlice";
import { updateCurrentMp3FromIndexDB } from "../../services/indexedDBController";
const SongRow = ({ data, number }) => {
  const dispatch = useDispatch();
  if (!data.title && !data.artist) return null;
  const playSong = async (el) => {
    const id = el.id;
    const updated = await updateCurrentMp3FromIndexDB(id);
    console.log("Updated", updated);
    updated == true && dispatch(setCurrentSongChanged(true));
  };
  return (
    <tr
      className="text-start song__row playlist-animate-fadeInUp "
      onAnimationEnd={(e) =>
        e.target.classList.remove("playlist-animate-fadeInUp")
      }
    >
      <td
        className=" w-[55px]  text-white/80 text-center"
        id={data.id}
        onClick={(e) => {
          playSong(e.currentTarget);
          //dispatch(setPlaying(true));
        }}
      >
        <span className="song__number text-lg">{number + 1}</span>
        <i className="ri-play-fill text-white text-lg  song__play__icon hidden "></i>
      </td>
      <td className="xs:w-[150px] lg:w-[300px] flex flex-col pt-1">
        <span className="text-white overflow-hidden whitespace-nowrap text-ellipsis">
          {data.title}
        </span>
        <span className="text-white/80 overflow-hidden whitespace-nowrap text-ellipsis">
          {data.artist}
        </span>
      </td>
      <td className="text-white/80 ">Albúm</td>
      <td className="text-white/80 text-center">2.40</td>
    </tr>
  );
};

export default SongRow;
