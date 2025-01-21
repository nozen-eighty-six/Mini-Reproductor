import { useDispatch, useSelector } from "react-redux";
import { addCurrentSong } from "../../redux/songSlice";
import { setPlaying } from "../../redux/playBackSlice";
const SongRow = ({ data, number }) => {
  const state = useSelector((state) => state.songs);
  // console.log(state);
  const dispatch = useDispatch();
  const playSong = (el) => {
    const id = parseInt(el.id);
    dispatch(addCurrentSong(id));
    console.log(state);
  };
  return (
    <tr className="text-start song__row">
      <td
        className=" w-[55px]  text-white/80 text-center"
        id={data.id}
        onClick={(e) => {
          console.log(e.currentTarget);
          playSong(e.currentTarget);
          dispatch(setPlaying(true));
        }}
      >
        <span className="song__number text-lg">{number + 1}</span>
        <i className="ri-play-fill text-white text-lg  song__play__icon hidden "></i>
      </td>
      <td className="w-max flex flex-col">
        <span className="text-white">{data.title}</span>
        <span className="text-white/80">{data.artist}</span>
      </td>
      <td className="text-white/80 ">Albúm</td>
      <td className="text-white/80 ">2.40</td>
    </tr>
  );
};

export default SongRow;
