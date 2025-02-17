import { useDispatch } from "react-redux";
import { saveMp3ToIndexedDB } from "../services/indexedDBController";
import { setCurrentSongChanged } from "../redux/playBackSlice";
import { useState } from "react";

export const useSong = () => {
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    //Convertimos en un array regular para usar sus métodos
    const filesList = Array.from(files);

    const promises = filesList.map(
      (file) =>
        new Promise((resolve, reject) => {
          jsmediatags.read(file, {
            onSuccess: (tag) => {
              const { title, artist, album } = tag.tags;
              resolve({
                id: crypto.randomUUID(),
                title: title || file.name,
                artist: artist || "Unknown",
                album: album || "Unknown",
                cover: file,
              });
            },
            onError: (error) => {
              reject(error);
            },
          });
        })
    );

    Promise.all(promises)
      .then(async (newList) => {
        const save = await saveMp3ToIndexedDB(newList);

        if (save) {
          dispatch(setCurrentSongChanged(true));
          setUpdate((prev) => !prev);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    handleInputChange,
    update,
  };
};
