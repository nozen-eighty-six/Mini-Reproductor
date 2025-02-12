import PlayListHeader from "./PlayListHeader";
import SongTable from "./Table/SongTable";
import DropZone from "./DropZone/DropZone";
import { getAllMp3FromIndexedDB } from "../../services/indexedDBController";
import { useEffect, useState } from "react";
import { useSong } from "../../hooks/useSong";
//import jsmediatags from "jsmediatags";

const PlayList = () => {
  const [songs, setSongs] = useState([{}]);
  const { handleInputChange, update } = useSong();
  useEffect(() => {
    const getSongs = async () => {
      const songs = await getAllMp3FromIndexedDB();
      console.log(songs);
      setSongs(songs);
    };
    getSongs();
  }, []);

  useEffect(() => {
    console.log("Valor de update en PlayList:", update);
    if (update) {
      const getSongs = async () => {
        const songs = await getAllMp3FromIndexedDB();
        console.log("Canciones actualizadas:", songs);
        setSongs(songs);
      };
      console.log("Update detectado en PlayList");
      getSongs();
    }
  }, [update]);

  return (
    <div className="play__list__container   xs:rounded-none lg:rounded-xl h-full overflow-hidden  ">
      <div className="h-full xs:rounded-none lg:rounded-xl overflow-auto border-red-400 ">
        {songs.length == 0 ? (
          <DropZone onFiles={handleInputChange} />
        ) : (
          <>
            <PlayListHeader update={update} />
            <SongTable songs={songs} handleInputChange={handleInputChange} />
          </>
          //</div></>
        )}
      </div>
    </div>
  );
};

export default PlayList;
