"use strict";
const musicContainer = document.getElementById("music-container");

const playButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

const musicInfo = document.querySelector(".music-info");
const musicTitle = document.querySelector("#music-title");

const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress");

const audio = document.querySelector("#audio");
const imageContainer = document.querySelector(".image-container");
const coverImage = document.querySelector("#cover");

//Song titles

const songs = ["ukulele", "hey", "summer"];

//Keeping track of songs
let songIndex = 0;

//Initially load song details into DOM
// loadSong(songs[songIndex])

//Update song details
function loadSong(song) {
  musicTitle.innerText = song;
  audio.src = `music/${song}.mp3`;
  coverImage.src = `images/${song}.jpg`;
}

function playSong() {
  console.log(songIndex);
  loadSong(songs[songIndex]);
  musicContainer.classList.add("play");
  audio.play();
  playButton.querySelector(".fas").classList.remove("fa-play");
  playButton.querySelector(".fas").classList.add("fa-pause");
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector(".fas").classList.remove("fa-pause");
  playButton.querySelector(".fas").classList.add("fa-play");
  audio.pause();
}

playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
});

function nextSong() {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else songIndex = 0;
  playSong();
}

nextButton.addEventListener("click", nextSong);

function previousSong() {
  songIndex > 0 ? songIndex-- : (songIndex = songs.length - 1);
  playSong();
}

previousButton.addEventListener("click", previousSong);
