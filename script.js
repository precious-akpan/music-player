"use strict";
const musicContainer = document.getElementById("music-container");

const playButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const muteButton = document.querySelector('.fa-volume-mute')

const musicInfo = document.querySelector(".music-info");
const musicTitle = document.querySelector("#music-title");

const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress");

const audio = document.querySelector("#audio");
const imageContainer = document.querySelector(".image-container");
const coverImage = document.querySelector("#cover");


//Functions
//Click to set song progress
function setProgress(e) {
    const width = this.clientWidth
    const xOffset = e.offsetX
    const duration = audio.duration
    audio.currentTime = xOffset / width * duration;
}

//Update song details
function loadSong(song) {
    musicTitle.innerText = song;
    audio.src = `music/${song}.mp3`;
    coverImage.src = `images/${song}.jpg`;
}


//Play song
function playSong() {
    loadSong(songs[songIndex]);
    setTimeout(()=>musicContainer.classList.add("play"), 500)
    audio.play();
    playButton.querySelector(".fas").classList.remove("fa-play");
    playButton.querySelector(".fas").classList.add("fa-pause");
}

function pauseSong() {
    setTimeout(() =>musicContainer.classList.remove("play"),500)
    playButton.querySelector(".fas").classList.remove("fa-pause");
    playButton.querySelector(".fas").classList.add("fa-play");
    audio.pause();
}

function nextSong() {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else songIndex = 0;
    playSong();
}

//Play previous song
function previousSong() {
    songIndex > 0 ? songIndex-- : (songIndex = songs.length - 1);
    playSong();
}

//Song progress update
function updateProgress(e) {
    const {currentTime, duration} = e.target
    const progress = currentTime/duration * 100
    progressBar.style.width = `${progress}%`
    // progressBar.textContent = `${Math.floor(progress)}`
    if (progress === 100) musicContainer.classList.remove('play')
}

//Mute song
const muteSong = () => {
    muteButton.classList.toggle('fa-volume-up')
    audio.muted = !audio.muted;
    audio.muted ? muteButton.title = 'Unmute' : muteButton.title = 'Mute'
}

//Volume control
function volumeControl(e) {
    if (e.key === 'ArrowUp') {
        if (audio.volume < .9) audio.volume = audio.volume + .1
    }

    if (e.key === 'ArrowDown') {
        if (audio.volume > 0.1) audio.volume = audio.volume - .1
    }
}


//Song titles

const songs = ["ukulele", "hey", "summer"];

//Keeping track of songs
let songIndex = 0;

playButton.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    isPlaying ? pauseSong() : playSong();
});



nextButton.addEventListener("click", nextSong);

audio.addEventListener('timeupdate', updateProgress)

previousButton.addEventListener("click", previousSong);

muteButton.addEventListener('click', muteSong)

window.addEventListener('keyup', volumeControl)

progressContainer.addEventListener('click', setProgress)

audio.volume = .3

audio.addEventListener('ended', nextSong)