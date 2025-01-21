import { createSlice } from "@reduxjs/toolkit";
//isPlaying: JSON.parse(localStorage.getItem("isPlaying")) || false,
//currentTime: JSON.parse(localStorage.getItem("currentTime")) || 0,
//duration: JSON.parse(localStorage.getItem("duration")) || 0,
// volume: JSON.parse(localStorage.getItem("volume")) || 0.5,
// loop: JSON.parse(localStorage.getItem("loop")) || false,
//shuffle: JSON.parse(localStorage.getItem("shuffle")) || false, //Modo aleatorio
//showPlaylist: JSON.parse(localStorage.getItem("showPlaylist")) || false,
//showSettings: JSON.parse(localStorage.getItem("showSettings")) || false,
// showLyrics: JSON.parse(localStorage.getItem("showLyrics")) || false,
// showEqualizer: JSON.parse(localStorage.getItem("showEqualizer")) || false,
// showTheme: JSON.parse(localStorage.getItem("showTheme")) || false,
// showAbout: JSON.parse(localStorage.getItem("showAbout")) || false,
//showDonate: JSON.parse(localStorage.getItem("showDonate")) || false,
//showNotification: JSON.parse(localStorage.getItem("showNotification")) || false,
//showSearch: JSON.parse(localStorage.getItem("showSearch")) || false,
// showQueue: JSON.parse(localStorage.getItem("showQueue")) || false,
//showHistory: JSON.parse(localStorage.getItem("showHistory")) || false,
//showFavorites: JSON.parse(localStorage.getItem("showFavorites")) || false, por agregar funcionalidad
//showAlbums: JSON.parse(localStorage.getItem("showAlbums")) || false,
//showArtists: JSON.parse(localStorage.getItem("showArtists")) || false,
//showGenres: JSON.parse(localStorage.getItem("showGenres")) || false,
//showPlaylists: JSON.parse(localStorage.getItem("showPlaylists")) || false,
//showSongs: JSON.parse(localStorage.getItem("showSongs")) || false,
//showRecentlyPlayed: JSON.parse(localStorage.getItem("showRecentlyPlayed")) || false,
//showTopTracks: JSON.parse(localStorage.getItem("showTopTracks")) || false,
const initialState = {
  songs: JSON.parse(localStorage.getItem("songs")) || [],
  currentSong: JSON.parse(localStorage.getItem("currentSong")) || {},
};
const songSlice = createSlice({
  name: "songs",
  initialState: initialState,
  reducers: {
    addCurrentSong: (state, action) => {
      state.currentSong = state.songs.find(
        (song) => song.id === action.payload
      );
    },
    addSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { addCurrentSong, addSongs } = songSlice.actions;

export default songSlice.reducer;
