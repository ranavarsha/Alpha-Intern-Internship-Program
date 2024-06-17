document.addEventListener('DOMContentLoaded', function () {
  const audioElement = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');
  const songTime = document.querySelector('.song-time');
  const songTitle = document.getElementById('song-title');
  const artistName = document.getElementById('artists-name'); // Corrected to match your HTML
  const albumArt = document.querySelector('.song-cover');

  let songs = [
      { title: 'Bachke Bachke', artist: 'Karan Aujla..', src: 'music/Bachke Bachke.mp3', img: 'img/Bachke Bachke.png' },
      { title: 'Taare', artist: 'Gurnam Bhullar..', src: 'music/Taare.mp3', img: 'img/Taare.png' },
      { title: 'Hass Hass', artist: 'Diljit Dosanjh..', src: 'music/Hass Hass.mp3', img: 'img/Hass Hass.png' },
      { title: 'Minna Minna', artist: 'Garry Sandhu..', src: 'music/Minna Minna.mp3', img: 'img/Minna Minna.png' },
      { title: 'Me and My Girlfriend', artist: 'Sidhu Moosewala..', src: 'music/Me and My Girlfriend.mp3', img: 'img/Me and My Girlfriend.png' },
  ];

  let currentSongIndex = 0;
  let isPlaying = false;

  function playSong(song) {
      audioElement.src = song.src;
      songTitle.textContent = song.title;
      artistName.textContent = song.artist;
      albumArt.src = song.img;
      audioElement.play();
      playPauseButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="5" width="4" height="14" fill="white"/>
          <rect x="14" y="5" width="4" height="14" fill="white"/>
        </svg>`;
      currentSongIndex = songs.indexOf(song);
      isPlaying = true;
  }

  function playNextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      playSong(songs[currentSongIndex]);
  }

  function playPreviousSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      playSong(songs[currentSongIndex]);
  }

  playPauseButton.addEventListener('click', () => {
      if (audioElement.paused) {
          audioElement.play();
          playPauseButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="5" width="4" height="14" fill="white"/>
              <rect x="14" y="5" width="4" height="14" fill="white"/>
            </svg>`;
          isPlaying = true;
      } else {
          audioElement.pause();
          playPauseButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="white"/>
            </svg>`;
          playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
          isPlaying = false;
      }
  });

  audioElement.addEventListener('timeupdate', () => {
      const currentTime = audioElement.currentTime;
      const duration = audioElement.duration || 0; // Default to 0 if duration is NaN
      songTime.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
      const progressPercentage = (currentTime / duration) * 100;
      progress.style.width = `${progressPercentage}%`;
  });

  audioElement.addEventListener('loadedmetadata', () => {
      // Ensure the duration is displayed correctly once metadata is loaded
      const duration = audioElement.duration;
      songTime.textContent = `0:00 / ${formatTime(duration)}`;
  });

  progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * audioElement.duration;
      audioElement.currentTime = newTime;
  });

  prevButton.addEventListener('click', playPreviousSong);
  nextButton.addEventListener('click', playNextSong);

  audioElement.addEventListener('ended', playNextSong);

  function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Initialize the player with the first song
  playSong(songs[0]);
  audioElement.pause(); // Start in paused state
  playPauseButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="white"/>
    </svg>`;
});