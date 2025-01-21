import { useDispatch, useSelector } from "react-redux";
import PlayListHeader from "./PlayListHeader";
import SongTable from "./SongTable";
import DropZone from "./DropZone/DropZone";
import { addCurrentSong, addSongs } from "../../redux/songSlice";
//import jsmediatags from "jsmediatags";

const PlayList = () => {
  const { songs } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
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
                cover: URL.createObjectURL(file),
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
        dispatch(addSongs(newList));
        dispatch(addCurrentSong(newList[0].id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="play__list__container  rounded-xl h-full overflow-hidden  ">
      <div className="h-full rounded-xl overflow-auto border-red-400 ">
        {songs.length == 0 ? (
          <DropZone onFiles={handleFiles} />
        ) : (
          <>
            <PlayListHeader />
            <SongTable />
          </>
        )}
      </div>
    </div>
  );
};

export default PlayList;
