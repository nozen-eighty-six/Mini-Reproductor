import { useEffect, useState } from "react";
import songList from "../../../data/song";
import { useSelector } from "react-redux";
import { getAllMp3FromIndexedDB } from "../../../services/indexedDBController";
import PlayListControls from "../Header/PlayListControls";
import SongRow from "./SongRow";

const SongTable = ({ songs, handleInputChange }) => {
  return (
    <div className="song__table  p-4  ">
      <PlayListControls handleInputChange={handleInputChange} />
      <div className="w-full">
        <table className="w-full">
          <thead className="mb-3">
            <tr className="text-start border-b-[1px] border-b-white/10 ">
              <th className="text-center text-white/80">#</th>
              <th className="text-start text-white/80">Título</th>
              <th className="text-start text-white/80">Álbum</th>
              <th className="xs:text-end lg:text-center text-white/80">
                <i className="ri-time-line"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 &&
              songs.map((song, i) => (
                <SongRow key={crypto.randomUUID()} data={song} number={i} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongTable;
