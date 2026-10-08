const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

const photoSources = [
  'assets/images/memory-1.png',
  'assets/images/memory-2.png',
  'assets/images/memory-3.png',
  'assets/images/memory-4.png',
  'assets/images/memory-1.png',
  'assets/images/memory-2.png'
];

const galleryFigures = document.querySelectorAll('.polaroid');
galleryFigures.forEach((figure, index) => {
  const img = figure.querySelector('img');
  const caption = figure.dataset.caption;
  img.src = photoSources[index % photoSources.length];
  img.alt = caption;
  img.loading = 'lazy';
});

const musicButton = document.getElementById('music-toggle');
const musicLabel = document.getElementById('music-label');
const musicStatus = document.getElementById('music-status');
const songPlayerContainer = document.getElementById('song-player');
const songFrame = document.getElementById('youtube-player');
const songVideoId = 't13PBhwpr68';
let songPlaying = false;
musicLabel.textContent = 'Play Alaakaa Loova';

function setMusicState(isPlaying) {
  songPlaying = isPlaying;
  musicButton.setAttribute('aria-pressed', String(isPlaying));
  musicLabel.textContent = isPlaying ? 'Pause Alaakaa Loova' : 'Play Alaakaa Loova';
  musicStatus.textContent = isPlaying
    ? 'Starting Alaakaa Loova (Unplugged). If it does not start, press play in the video.'
    : 'Ready to play: Alaakaa Loova (Unplugged).';
}

function playSong(scrollToPlayer = false) {
  songFrame.src = `https://www.youtube.com/embed/${songVideoId}?autoplay=1&playsinline=1&rel=0`;
  setMusicState(true);
  if (scrollToPlayer) {
    songPlayerContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function pauseSong() {
  songFrame.src = `https://www.youtube.com/embed/${songVideoId}?playsinline=1&rel=0`;
  setMusicState(false);
}

musicButton.addEventListener('click', () => {
  if (songPlaying) {
    pauseSong();
  } else {
    playSong(true);
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxButton = document.querySelector('.lightbox-close');

const polaroids = document.querySelectorAll('.polaroid');
polaroids.forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.heart-btn')) return;

    const image = card.querySelector('img');
    const caption = card.dataset.caption;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

closeLightboxButton.addEventListener('click', () => {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

document.querySelectorAll('.heart-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '♥' : '♡';
  });
});

const giftButton = document.getElementById('gift-button');
const giftBox = document.getElementById('gift-box');
const giftMessage = document.getElementById('gift-message');
const confettiLayer = document.getElementById('confetti-layer');

function launchConfetti() {
  confettiLayer.innerHTML = '';
  const colors = ['#e7a4bb', '#d5c2ee', '#f5d7a8', '#f7cdbf', '#ffffff', '#c8dbbc'];

  for (let i = 0; i < 100; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--delay', `${Math.random() * 0.7}s`);
    piece.style.setProperty('--fall-time', `${2.2 + Math.random() * 1.8}s`);
    confettiLayer.appendChild(piece);
  }

  window.setTimeout(() => {
    confettiLayer.innerHTML = '';
  }, 5200);
}

giftButton.addEventListener('click', () => {
  giftBox.classList.add('open');
  giftMessage.classList.add('show');
  launchConfetti();
  playSong();
});
