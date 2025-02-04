import PlayListHeader from "./PlayListHeader";
import SongTable from "./SongTable";
import DropZone from "./DropZone/DropZone";
import {
  getAllMp3FromIndexedDB,
  saveCurrentMp3ToIndexedDB,
  saveMp3ToIndexedDB,
} from "../../services/indexedDBController";
import { useEffect, useState } from "react";
//import jsmediatags from "jsmediatags";

const PlayList = () => {
  const [songs, setSongs] = useState([{}]);

  //const dispatch = useDispatch();
  const handleFiles = (files) => {
    //Convertimos en un array regular para usar sus métodos
    const filesList = Array.from(files);

    const promises = filesList.map(
      (file, index) =>
        new Promise((resolve, reject) => {
          jsmediatags.read(file, {
            onSuccess: (tag) => {
              const { title, artist, album } = tag.tags;
              resolve({
                id: index + 1,
                title: title || file.name,
                artist: artist || "Unknown",
                album: album || "Unknown",
                cover: file,
              });
            },
            onError: (error) => {
              console.error(error);
            },
          });
        })
    );

    Promise.all(promises)
      .then((newList) => {
        //        dispatch(addSongs(newList));
        //      dispatch(addCurrentSong(newList[0].id));
        saveMp3ToIndexedDB(newList);
        saveCurrentMp3ToIndexedDB(newList[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getSongs = async () => {
      const songs = await getAllMp3FromIndexedDB();
      console.log(songs);
      setSongs(songs);
    };
    getSongs();
  }, []);
  return (
    <div className="play__list__container  xs:rounded-none lg:rounded-xl h-full overflow-hidden  ">
      <div className="h-full xs:rounded-none lg:rounded-xl overflow-auto border-red-400 ">
        {songs.length == 0 ? (
          <DropZone onFiles={handleFiles} />
        ) : (
          <>
            <PlayListHeader />
            <SongTable />
          </>
          //</div></>
        )}
      </div>
    </div>
  );
};

export default PlayList;
