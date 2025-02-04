export const saveMp3ToIndexedDB = async (files) => {
  const dBrequest = indexedDB.open("MyMusicDB", 1);

  dBrequest.onupgradeneeded = (event) => {
    const db = event.target.result; // obtengo una instancia de la base de datos
    if (!db.objectStoreNames.contains("mp3Files")) {
      db.createObjectStore("mp3Files", { keyPath: "id" });
      db.createObjectStore("currentMp3", { keyPath: "id" });
    }
  };

  dBrequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("mp3Files", "readwrite");
    const store = transaction.objectStore("mp3Files");

    for (let file in files) {
      console.log(file);
      store.add(files[file]);
    }
  };
  dBrequest.onerror = (event) => {
    console.log("Error", event.target.error);
  };
};

export const getAllMp3FromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyMusicDB", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("mp3Files", "readonly");
      const store = transaction.objectStore("mp3Files");

      const getRequest = store.getAll();
      getRequest.onsuccess = (event) => {
        const fileData = event.target.result;
        if (fileData) {
          resolve(fileData);
        } else {
          console.log("No se encontró elementos");
          resolve([]);
        }
      };

      getRequest.onerror = (event) => {
        console.log("Error", event.target.error);
      };
    };

    dbRequest.onerror = (event) => {
      console.log("Error", event.target.error);
    };
  });
};

export const saveCurrentMp3ToIndexedDB = async (file) => {
  const dBrequest = indexedDB.open("MyMusicDB", 1);

  dBrequest.onupgradeneeded = (event) => {
    const db = event.target.result; // obtengo una instancia de la base de datos
    if (!db.objectStoreNames.contains("currentMp3")) {
      db.createObjectStore("currentMp3", { keyPath: "id" });
    }
  };

  dBrequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("currentMp3", "readwrite");
    const store = transaction.objectStore("currentMp3");
    store.add(file);
  };
  dBrequest.onerror = (event) => {
    console.log("Error", event.target.error);
  };
};

export const getCurrentMp3FromIndexedDB = (id) => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyMusicDB", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("currentMp3", "readonly");
      const store = transaction.objectStore("currentMp3");

      const getRequest = store.get(id);
      getRequest.onsuccess = (event) => {
        const fileData = event.target.result;
        if (fileData) {
          const currentSong = {
            ...fileData,
            cover: URL.createObjectURL(fileData.cover),
          };
          resolve(currentSong);
        } else {
          console.log("No se encontró el archivo");
        }
      };

      getRequest.onerror = (event) => {
        console.log("Error", event.target.error);
      };
    };

    dbRequest.onerror = (event) => {
      console.log("Error", event.target.error);
    };
  });
};
