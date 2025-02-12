export const saveMp3ToIndexedDB = async (files) => {
  return new Promise((resolve, reject) => {
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
        console.log(files[file]);
        const saveFiles = store.add(files[file]);

        saveFiles.onsuccess = (event) => {
          console.log("Archivo guardado correctamente");
        };

        saveFiles.onerror = (event) => {
          console.log("Error al guardar el archivo", event.target.error);
        };

        //store.add(files[file]);
      }
      resolve(true);
    };
    dBrequest.onerror = (event) => {
      console.log("Error", event.target.error);
    };
  });
};

export const getNumberOfSongs = () => {
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
          resolve(fileData.length);
        } else {
          console.log("No se encontró elementos");
          resolve(0);
        }
      };
      getRequest.onerror = (event) => {
        console.log("Error", event.target.error);
      };
    };
  });
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
  return new Promise((resolve, reject) => {
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
      const newFile = { ...file, id: 1 };
      const saveRequest = store.put(newFile);

      saveRequest.onsuccess = (event) => {
        console.log("Elemento guardado correctamente");
        resolve(true);
      };

      saveRequest.onerror = (event) => {
        console.log("Error al guardar el elemento", event.target.error);
        reject(event.target.error);
      };
    };
    dBrequest.onerror = (event) => {
      console.log("Error", event.target.error);
      reject(event.target.error);
    };
  });
};

export const updateCurrentMp3FromIndexDB = async (id) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction("currentMp3", "readwrite");
    const store = transaction.objectStore("currentMp3");

    // Limpiar el almacén de datos
    await clearObjectStore(store);

    // Obtener el nuevo MP3 y guardarlo en IndexedDB
    const fileFound = await getMp3FromIndexedDB(id);
    await saveCurrentMp3ToIndexedDB(fileFound);

    console.log("Elemento actualizado correctamente");
    return true;
  } catch (error) {
    console.error("Error al actualizar el MP3 en IndexedDB:", error);
    return false;
  }
};

// Abre la base de datos de IndexedDB con Promesas
const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyMusicDB", 1);

    dbRequest.onsuccess = (event) => resolve(event.target.result);
    dbRequest.onerror = (event) => reject(event.target.error);
  });
};

// Limpia el almacén de datos con una Promesa
const clearObjectStore = (store) => {
  return new Promise((resolve, reject) => {
    const deleteRequest = store.clear();

    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = (event) => reject(event.target.error);
  });
};

export const getCurrentMp3FromIndexedDB = (id, flag) => {
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
          if (flag === "current") {
            const currentSong = {
              ...fileData,
              cover: URL.createObjectURL(fileData.cover),
            };
            console.log("Se encontró");
            resolve(currentSong);
          } else {
            const currentSong = {
              ...fileData,
              cover: fileData.cover,
            };
            console.log("Se encontró");
            resolve(currentSong);
          }
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

export const getMp3FromIndexedDB = (id) => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyMusicDB", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("mp3Files", "readonly");
      const store = transaction.objectStore("mp3Files");
      console.log(id);
      const getRequest = store.get(id);
      getRequest.onsuccess = (event) => {
        const fileData = event.target.result;
        if (fileData) {
          resolve(fileData);
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
