const w = window;
const songList = [
  {
    id: 1,
    title: "Cactus",
    artist: "Nasa Histories",
    cover: "catcus.mp3",
    songtImage: "nasa-histories.jpg",
  },
  {
    id: 2,
    title: "Amtrak",
    artist: "Los Retros",
    cover: "Amtrak.mp3",
    songtImage: "los-retros.jpg",
  },
  {
    id: 3,
    title: "Blue Hair",
    artist: "TV Girl",
    cover: "Blue-Hair.mp3",
    songtImage: "tv-girl.jpg",
  },
  {
    id: 4,
    title: "Adoro",
    artist: "Bronco",
    cover: "Bronco-Adoro.mp3",
    songtImage: "bronco.jpg",
  },
  {
    id: 5,
    title: "Stevie Doesn't Wonder",
    artist: "Hotel Ugly",
    cover: "Stevie-Doesnt-Wonder-Hotel-Ugly.mp3",
    songtImage: "nasa-histories.jpg",
  },
  {
    id: 6,
    title: "Que no quede huella",
    artist: "Bronco",
    cover: "Bronco-Que-No-Quede-Huella.mp3",
    songtImage: "los-retros.jpg",
  },
  {
    id: 7,
    title: "Tu última canción",
    artist: "Los temerarios",
    cover: "Tu-ultima-Cancion.mp3",
    songtImage: "los-temarios .jpg",
  },
  {
    id: 8,
    title: "Ya no quiero más SKA",
    artist: "JAS",
    cover: "Ya-No-Quiero-Mas-SKA.mp3",
    songtImage: "jas.jpg",
  },
  {
    id: 9,
    title: "Leni",
    artist: "Crystal Castles",
    cover: "crystal-castles-leni.mp3",
    songtImage: "crystal-castles.jpg",
  },
  {
    id: 10,
    title: "It fit when I was a kid",
    artist: "Crystal Castles",
    cover: "it-fit-when-i-was-a-kid-crystal-castles-slowed.mp3",
    songtImage: "crystal-castles.jpg",
  },
  {
    id: 11,
    title: "Degeneracion Actual",
    artist: "Pedro Suarez Vertiz",
    cover: "Pedro-Suarez-Vertiz-Degeneracion-Actual.mp3",
    songtImage: "pedro-suarez-vertiz.jpg",
  },
];
/*
if (w.localStorage.getItem("songs") === null) {
  window.localStorage.setItem("songs", JSON.stringify(songList));
}
if (w.localStorage.getItem("currentSong") === null) {
  window.localStorage.setItem("currentSong", JSON.stringify({}));
}
if (w.localStorage.getItem("isPlaying") === null) {
  window.localStorage.setItem("isPlaying", JSON.stringify(false));
}
if (w.localStorage.getItem("currentTime") === null) {
  window.localStorage.setItem("currentTime", JSON.stringify(0));
}
if (w.localStorage.getItem("duration") === null) {
  window.localStorage.setItem("duration", JSON.stringify(0));
}
if (w.localStorage.getItem("volume") === null) {
  window.localStorage.setItem("volume", JSON.stringify(0.5));
}
if (w.localStorage.getItem("loop") === null) {
  window.localStorage.setItem("loop", JSON.stringify(false));
}
*/
export default songList;
