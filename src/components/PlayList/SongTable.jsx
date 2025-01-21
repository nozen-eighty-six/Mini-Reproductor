import { useState } from "react";
import PlayListControls from "./PlayListControls";
import songList from "../../data/song";
import SongRow from "./SongRow";
import { useSelector } from "react-redux";

const SongTable = () => {
  //const [songs, setSongs] = useState(songList);
  const { songs } = useSelector((state) => state.songs);
  return (
    <div className="song__table  p-4  ">
      <PlayListControls />
      <div className="w-full">
        <table className="w-full">
          <thead className="mb-3">
            <tr className="text-start border-b-[1px] border-b-white/10 ">
              <th className="text-center text-white/80">#</th>
              <th className="text-start text-white/80">Título</th>
              <th className="text-start text-white/80">Álbum</th>
              <th className="text-start text-white/80">Duración</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, i) => (
              <SongRow key={song.id} data={song} number={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongTable;
