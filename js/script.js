const musicList = [
    {
        title: "Cantik",
        artist: "Kahitna",
        file: "assets/music/cantik.mp3",
        cover: "assets/adhinpict/matcha.webp"
    },
    {
        title: "Jatuh Cinta Lagi?",
        artist: "Hivi",
        file: "assets/music/siap kah dhin.mp3",
        cover: "assets/adhinpict/november.webp"
    },
    {
        title: "Katakan Saja",
        artist: "Adikara",
        file: "assets/music/katakanlah.mp3",
        cover: "assets/adhinpict/scorpio.webp"
    },
    {
        title: "Looks Like I Love You",
        artist: "Langley",
        file: "assets/music/looks like i love you dhin.mp3",
        cover: "assets/adhinpict/ramadhan.webp"
    },
    {
        title: "Pandangan Pertama",
        artist: "RAN",
        file: "assets/music/pandangan pertama.mp3",
        cover: "assets/adhinpict/potterhead.webp"
    },
    {
        title: "Inikah Cinta?",
        artist: "M.E Voices",
        file: "assets/music/inikah cinta.mp3",
        cover: "assets/adhinpict/palembang.webp"
    },
    {
        title: "Menyimpan Rasa",
        artist: "Devano",
        file: "assets/music/menyimpan.mp3",
        cover: "assets/adhinpict/scoopy.webp"
    },
    {
        title: "Terdiam",
        artist: "Maliq D'Esse",
        file: "assets/music/terdiam.mp3",
        cover: "assets/adhinpict/cantik.webp"
    },
    {
        title: "Andai Dia Tahu",
        artist: "Kahitna",
        file: "assets/music/andai kamu tahu dhin.mp3",
        cover: "assets/adhinpict/gatau.webp"
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

function loadTrack(trackIndex) {
    const track = musicList[trackIndex];
    audio.src = track.file;
    title.textContent = track.title;
    artist.textContent = track.artist;
    cover.src = track.cover;
    audio.load();
    updateProgressBar();  
}

function togglePlayPause() {
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

function updatePlayPauseIcon() {
    if (audio.paused) {
        playPauseButton.querySelector('i').className = `bi ${playIcon}`;
    } else {
        playPauseButton.querySelector('i').className = `bi ${pauseIcon}`;
    }
}

function playMusic() {
    audio.play();
    updatePlayPauseIcon();
}

function pauseMusic() {
    audio.pause();
    updatePlayPauseIcon();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % musicList.length;
    loadTrack(currentTrack);
    playMusic();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
    loadTrack(currentTrack);
    playMusic();
}

function updateProgressBar() {
    audio.removeEventListener('timeupdate', handleTimeUpdate);
    
    function handleTimeUpdate() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;

        currentTimeEl.textContent = formatTime(audio.currentTime);

        if (audio.duration) {
            durationTimeEl.textContent = formatTime(audio.duration);
        }

        if (audio.ended) {
            nextTrack();  
        }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate);
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

const buttons = document.querySelectorAll('.btn-circle, .btn-outline-light');

buttons.forEach(button => {
    // Menghapus efek hover setelah tombol disentuh dan dilepas
    button.addEventListener('touchstart', function() {
        button.classList.add('no-hover');
    });
    
    button.addEventListener('touchend', function() {
        setTimeout(() => {
            button.classList.remove('no-hover');
        }, 100); // Tambahkan sedikit jeda untuk melihat efek sentuhan
    });
});
 

// Event listeners
playPauseButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextTrack);
prevButton.addEventListener('click', prevTrack);
progressContainer.addEventListener('click', setProgress);

// Initialize player with the first track
loadTrack(currentTrack);
