// Abre la base de datos de IndexedDB con Promesas
const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("MyMusicDB", 1);

    dbRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("mp3Files")) {
        const store = db.createObjectStore("mp3Files", { keyPath: "id" });
        store.createIndex("title", "title", { unique: false });
      }
      if (!db.objectStoreNames.contains("currentMp3")) {
        db.createObjectStore("currentMp3", { keyPath: "id" });
      }
    };

    dbRequest.onsuccess = (event) => resolve(event.target.result);
    dbRequest.onerror = (event) => reject(event.target.error);
  });
};
export const saveMp3ToIndexedDB = async (files) => {
  try {
    const dBrequest = await openIndexedDB();

    const transaction = dBrequest.transaction("mp3Files", "readwrite");
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
    }
    await saveCurrentMp3ToIndexedDB();
    return true;
  } catch (error) {
    console.log("Error al guardar el archivo", error);
    return false;
  }
};

export const getNumberOfSongs = async () => {
  const dbRequest = await openIndexedDB();

  const transaction = dbRequest.transaction("mp3Files", "readonly");
  const store = transaction.objectStore("mp3Files");

  const getRequest = store.getAll();
  return new Promise((resolve, reject) => {
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
  });
};
export const getAllMp3FromIndexedDB = async () => {
  const dbRequest = await openIndexedDB();

  const transaction = dbRequest.transaction("mp3Files", "readonly");
  const store = transaction.objectStore("mp3Files");

  const getRequest = store.getAll();
  return new Promise((resolve, reject) => {
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
  });
};

export const saveCurrentMp3ToIndexedDB = async () => {
  //return new Promise((resolve, reject) => {
  const dBrequest = await openIndexedDB();

  // Crear una transacción que abarque AMBOS stores
  const transaction = dBrequest.transaction(
    ["mp3Files", "currentMp3"],
    "readwrite"
  );
  const mp3Store = transaction.objectStore("mp3Files");

  const storeCurrentSong = transaction.objectStore("currentMp3");

  const newFile = await getFirsSong(mp3Store);
  console.log(newFile);
  const saveRequest = storeCurrentSong.add(newFile);

  return new Promise((resolve, reject) => {
    saveRequest.onsuccess = (event) => {
      console.log("Elemento guardado correctamente");
      resolve(true);
    };

    saveRequest.onerror = (event) => {
      console.log("Error al guardar el elemento", event.target.error);
      reject(event.target.error);
    };
  });
};

export const updateCurrentMp3FromIndexDB = async (id) => {
  try {
    const fileFound = await getMp3FromIndexedDB(id);
    if (!fileFound) {
      throw new Error("No se encontró el archivo en IndexedDB.");
    }
    console.log(fileFound);

    const db = await openIndexedDB();
    const transaction = db.transaction("currentMp3", "readwrite");
    const store = transaction.objectStore("currentMp3");

    // Limpiar el almacén de datos
    //await clearObjectStore(store);

    // Limpiar el almacén de datos y esperar a que termine
    await new Promise((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = resolve;
      clearRequest.onerror = (event) => reject(event.target.error);
    });

    const putRequest = store.put(fileFound);

    return new Promise((resolve, reject) => {
      putRequest.onsuccess = () => {
        console.log("Elemento actualizado correctamente");
        resolve(true);
      };
      putRequest.onerror = (event) => {
        console.error(
          "Error al actualizar el MP3 en IndexedDB:",
          event.target.error
        );
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error al actualizar el MP3 en IndexedDB:", error);
    return false;
  }
};

// Limpia el almacén de datos con una Promesa
const clearObjectStore = async (store) => {
  return new Promise((resolve, reject) => {
    const deleteRequest = store.clear();

    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = (event) => reject(event.target.error);
  });
};

export const getCurrentMp3FromIndexedDB = async (flag) => {
  //return new Promise((resolve, reject) => {
  const dbRequest = await openIndexedDB();

  const transaction = dbRequest.transaction("currentMp3", "readonly");
  const store = transaction.objectStore("currentMp3");

  const getRequest = store.getAll();

  return new Promise((resolve, reject) => {
    getRequest.onsuccess = (event) => {
      const fileData = event.target.result;
      if (fileData) {
        if (flag === "current") {
          const data = fileData[0];
          const currentSong = {
            ...data,
            cover: URL.createObjectURL(data.cover),
          };
          resolve(currentSong);
        } else {
          const data = fileData[0];

          const currentSong = {
            ...data,
            cover: fileData.cover,
          };
          resolve(currentSong);
        }
      } else {
        console.log("No se encontró el archivo");
      }
    };

    getRequest.onerror = (event) => {
      console.log("Error", event.target.error);
    };
  });
};

export const getMp3FromIndexedDB = async (id) => {
  //return new Promise((resolve, reject) => {
  const dbRequest = await openIndexedDB();

  const transaction = dbRequest.transaction("mp3Files", "readonly");
  const store = transaction.objectStore("mp3Files");
  console.log(id);
  const getRequest = store.get(id);
  return new Promise((resolve, reject) => {
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
  });
};
export const getFirsSong = (store) => {
  return new Promise((resolve, reject) => {
    const request = store.openCursor(); // Abre el cursor sin rango para obtener el primero

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        resolve(cursor.value); // Devuelve el primer valor encontrado
      } else {
        resolve(null); // No hay elementos
      }
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getNextElement = async (objectStore, currentId) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(objectStore, "readonly");
    const store = transaction.objectStore(objectStore);

    /*if (!store.indexNames.contains("title")) {
      throw new Error("El índice 'title' no existe en IndexedDB.");
    }*/
    //const index = store.index("title");
    const range = IDBKeyRange.lowerBound(currentId, true);
    const getRequest = store.openCursor(range);

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value);
        } else {
          resolve(null);
        }
      };
      getRequest.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error al obtener el siguiente elemento:", error);
    return null;
  }
};
export const getPreviousSong = async (objectStore, currentId) => {
  try {
    const db = await openIndexedDB();
    const transaccion = db.transaction(objectStore, "readonly");
    const store = transaccion.objectStore(objectStore);
    const range = IDBKeyRange.upperBound(currentId, true);
    const getRequest = store.openCursor(range, "prev");

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          resolve(cursor.value);
        } else {
          resolve(null);
        }
      };
    });
  } catch (error) {
    console.error("Error al obtener el siguiente elemento:", error);
    return null;
  }
};

export const executeNextElement = async () => {
  try {
    const currentSong = await getCurrentMp3FromIndexedDB("notCurrent");
    console.log("Current Song: ", currentSong);
    const result = await getNextElement("mp3Files", currentSong.id);
    if (result == null) {
      const db = await openIndexedDB();
      const transaction = db.transaction("mp3Files", "readonly");
      const store = transaction.objectStore("mp3Files");
      const { id } = await getFirsSong(store);
      console.log("First Song: ", id);
      await updateCurrentMp3FromIndexDB(id);
      return;
    }
    console.log("Execute: ", result);
    await updateCurrentMp3FromIndexDB(result.id);
  } catch (error) {
    console.log(error);
  }
};

export const executePreviousElement = async () => {
  try {
    const currentSong = await getCurrentMp3FromIndexedDB("notCurrent");
    console.log("Current Song: ", currentSong);
    const previousSong = await getPreviousSong("mp3Files", currentSong.id);
    if (previousSong == null) return;
    await updateCurrentMp3FromIndexDB(previousSong.id);
  } catch (error) {
    console.log(error);
  }
};
//executeNextElement();
