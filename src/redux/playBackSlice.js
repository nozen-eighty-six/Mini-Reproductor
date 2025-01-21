import { createSlice } from "@reduxjs/toolkit";

const playBackSlice = createSlice({
  name: "playback",
  initialState: {
    isPlaying: false,
    currentTimeP: 0,
    duration: 0,
    volume: 1,
    loop: false,
  },
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTimeP: (state, action) => {
      state.currentTimeP = action.payload;
    },
    setDurationP: (state, action) => {
      state.duration = action.payload;
    },
    setLoopP: (state, action) => {
      state.loop = action.payload;
    },
    setVolumen: (state, action) => {
      state.volume = action.payload;
    },
  },
});

export const {
  setPlaying,
  setCurrentTimeP,
  setDurationP,
  setLoopP,
  setVolumen,
} = playBackSlice.actions;
export default playBackSlice.reducer;
