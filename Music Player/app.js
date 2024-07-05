
'use strict';

/**
 * all music information
 */
const ncsTracks = [
  {
    backgroundImage: "image.jpg",
    posterUrl: "image.jpg",
    title: "Atif Aslam (Tum joo ai zangai me baat bangai)",
    year: 2020,
    artist: "Atif Aslam",
    musicPath: "./music/song.mp4"
  },
  {
    backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjB6ieXZJ2xIgU_ZFveHWXq57mRzcUAkSi2A&s",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjB6ieXZJ2xIgU_ZFveHWXq57mRzcUAkSi2A&s",
    title: "Atif Aslam (Ankhe_munde_to_Jane)[RLS Release]",
    year: 2023,
    artist: "Atif Aslam",
    musicPath: "./music/Ankhe_munde_to😌_Jane_Kise_dhunde😳_Ki_soya_jaye_na😍(144p).mp4"
  },
  {
    backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2YXQ45GmjazzBbIiqCzbOshTluFDJts2ojqmxnh2P4Q4uXqunmHZEniVurxQbdGRmyzU&usqp=CAU",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2YXQ45GmjazzBbIiqCzbOshTluFDJts2ojqmxnh2P4Q4uXqunmHZEniVurxQbdGRmyzU&usqp=CAU",
    title: "Ali Zafa (Tana_Bana_OST)[RLS Release]",
    year: 2019,
    artist: "Ali Zafar",
    musicPath: "./music/Tana_Bana_OST____Lyrics____Tehreem_Creats____lyrical_video____Trending🥀🌸(144p).mp4"
  },
  {
    backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlqSkE_4DXH3o98t8YVaEZsOqgPKg6cKlA7A&s",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlqSkE_4DXH3o98t8YVaEZsOqgPKg6cKlA7A&s",
    title: "Ali Zafar and Fateh_Ali_Khan (Ehd-e-Wafa_OST) [RLS Release]",
    year: 2017,
    artist: "Ali Zafar and Fateh_Ali_Khan",
    musicPath: "./music/Ehd-e-Wafa_OST___Ali_Zafar,_Asim_Azhar,_Sahir_Ali_Bagga___Aima_Baig_-__ISPR_Official_Song_(144p).mp4"
  },
  {
    backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGY5KmKrZfI9exUEI1_RaeYtewYDsq3AwsQ&s",
    posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGY5KmKrZfI9exUEI1_RaeYtewYDsq3AwsQ&s",
    title: "Rahat_Fateh_Ali_Khan (Afreen_Afreen)[RLS Release]",
    year: 2016, 
    artist: "Fateh_Ali_Khan",
    musicPath: "./music/Coke_Studio_Season_9__Afreen_Afreen__Rahat_Fateh_Ali_Khan___Momina_Mustehsan(48k).mp3"
  }
];

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}


const playlist = document.querySelector("[data-music-list]");

for (let i = 0, len = ncsTracks.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${ncsTracks[i].posterUrl}" width="800" height="800" alt="${ncsTracks[i].title} Album Poster"
        class="img-cover">
      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
  </li>
  `;
}


const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);


const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
}

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();
});


const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");

const audioSource = new Audio(ncsTracks[currentMusic].musicPath);

const changePlayerInfo = function () {
  playerBanner.src = ncsTracks[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${ncsTracks[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${ncsTracks[currentMusic].backgroundImage})`;
  playerTitle.textContent = ncsTracks[currentMusic].title;
  playerAlbum.textContent = ncsTracks[currentMusic].album;
  playerYear.textContent = ncsTracks[currentMusic].year;
  playerArtist.textContent = ncsTracks[currentMusic].artist;

  audioSource.src = ncsTracks[currentMusic].musicPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
}

addEventOnElements(playlistItems, "click", changePlayerInfo);


const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");


const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
}

audioSource.addEventListener("loadeddata", updateDuration);


const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    playInterval = setInterval(updateRunningTime, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(playInterval);
  }
}

playBtn.addEventListener("click", playMusic);


const playerRunningTime = document.querySelector("[data-running-time]");

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill();
  isMusicEnd();
}


const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelector("[data-range-fill]");

const updateRangeFill = function () {
  let element = this || ranges[0];

  const rangeValue = (element.value / element.max) * 100;
  element.nextElementSibling.style.width = `${rangeValue}%`;
}

addEventOnElements(ranges, "input", updateRangeFill);


const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);


const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    audioSource.currentTime = 0;
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    updateRangeFill();
  }
}


const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic >= ncsTracks.length - 1 ? currentMusic = 0 : currentMusic++;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipNextBtn.addEventListener("click", skipNext);

const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic <= 0 ? currentMusic = ncsTracks.length - 1 : currentMusic--;
  }
  changePlayerInfo();
  changePlaylistItem();
}

playerSkipPrevBtn.addEventListener("click", skipPrev);


const getRandomMusic = () => Math.floor(Math.random() * ncsTracks.length);

const shuffleMusic = () => {
  let randomMusic = getRandomMusic();

  while (currentMusic === randomMusic) {
    randomMusic = getRandomMusic();
  }
  currentMusic = randomMusic;
}

const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

const shuffle = function () {
  playerShuffleBtn.classList.toggle("active");
  isShuffled = isShuffled ? false : true;
}

playerShuffleBtn.addEventListener("click", shuffle);


const playerRepeatBtn = document.querySelector("[data-repeat]");

const repeat = function () {
  if (!audioSource.loop) {
    audioSource.loop = true;
    this.classList.add("active");
  } else {
    audioSource.loop = false;
    this.classList.remove("active");
  }
}

playerRepeatBtn.addEventListener("click", repeat);


const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  if (audioSource.volume <= 0.1) {
    playerVolumeBtn.children[0].textContent = "volume_mute";
  } else if (audioSource.volume <= 0.5) {
    playerVolumeBtn.children[0].textContent = "volume_down";
  } else {
    playerVolumeBtn.children[0].textContent = "volume_up";
  }
}

playerVolumeRange.addEventListener("input", changeVolume);


const muteVolume = function () {
  if (!audioSource.muted) {
    audioSource.muted = true;
    playerVolumeBtn.children[0].textContent = "volume_off";
  } else {
    changeVolume();
  }
}

playerVolumeBtn.addEventListener("click", muteVolume);