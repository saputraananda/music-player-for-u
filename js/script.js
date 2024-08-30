const musicList = [
    {
        title: "Siapkah Tuk Jatuh Cinta Lagi?",
        artist: "Hivi",
        file: "assets/siap kah dhin.mp3",
        cover: "assets/Abstrakisme.png"
    },
    {
        title: "Katakan Saja",
        artist: "Adikara",
        file: "assets/katakanlah.mp3",
        cover: "assets/kelinci.jpg"
    },
    {
        title: "Looks Like I Love You",
        artist: "Langley",
        file: "assets/looks like i love you dhin.mp3",
        cover: "assets/kelinci.jpg"
    },
    {
        title: "Pandangan Pertama",
        artist: "RAN",
        file: "assets/pandangan pertama.mp3",
        cover: "assets/kelinci.jpg"
    },
    {
        title: "Dia",
        artist: "Maliq D'Esse",
        file: "assets/kamu dhin.mp3",
        cover: "assets/kelinci.jpg"
    },
    {
        title: "Untitled",
        artist: "Untuk Yulanda",
        file: "assets/untitled.mp3",
        cover: "assets/kelinci.jpg"
    },
    {
        title: "Andai Dia Tahu",
        artist: "Untuk Yulanda",
        file: "assets/andai kamu tahu dhin.mp3",
        cover: "assets/kelinci.jpg"
    }
];

let currentTrack = 0;
let audio = new Audio(musicList[currentTrack].file);
const playPauseButton = document.getElementById('play-pause');
const playIcon = 'bi-play-fill';
const pauseIcon = 'bi-pause-fill';
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const progressContainer = document.querySelector('.progress');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

// Load the track into the player
function loadTrack(trackIndex) {
    const track = musicList[trackIndex];
    audio.src = track.file;
    title.textContent = track.title;
    artist.textContent = track.artist;
    cover.src = track.cover;
    audio.load();
    updateProgressBar();  // Start updating progress bar for new track
}

// Toggle play/pause
function togglePlayPause() {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

// Update icon based on state
function updatePlayPauseIcon() {
    if (audio.paused) {
        playPauseButton.querySelector('i').className = `bi ${playIcon}`;
    } else {
        playPauseButton.querySelector('i').className = `bi ${pauseIcon}`;
    }
}

// Play the music
function playMusic() {
    audio.play();
    updatePlayPauseIcon();
}

// Pause the music
function pauseMusic() {
    audio.pause();
    updatePlayPauseIcon();
}

// Go to the next track
function nextTrack() {
    currentTrack = (currentTrack + 1) % musicList.length;
    loadTrack(currentTrack);
    playMusic();
}

// Go to the previous track
function prevTrack() {
    currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
    loadTrack(currentTrack);
    playMusic();
}

// Update progress bar dynamically as music plays
function updateProgressBar() {
    // Clear existing listeners to prevent multiple event registrations
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    
    function handleTimeUpdate() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;

        // Update current time
        currentTimeEl.textContent = formatTime(audio.currentTime);

        // Set duration time (once audio data is available)
        if (audio.duration) {
            durationTimeEl.textContent = formatTime(audio.duration);
        }

        if (audio.ended) {
            nextTrack();  // Move to the next song when current song ends
        }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate);
}

// Click on progress bar to change position in song
function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    // Calculate new current time based on where user clicked
    audio.currentTime = (clickX / width) * duration;
}

// Format time helper function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listeners
playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
progressContainer.addEventListener('click', setProgress);

// Initialize player with the first track
loadTrack(currentTrack);
