const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const birthdayAudio = document.getElementById('birthdayAudio');
const wishButton = document.getElementById('wishButton');
const wishResponse = document.getElementById('wishResponse');
const confettiLayer = document.querySelector('.confetti-layer');

const confettiColors = ['#f2a8c1', '#d9c8f2', '#f7d78b', '#f8c9d8', '#c5d9c7', '#e7a5b9'];

function launchConfetti(count = 75) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDelay = `${Math.random() * 1.1}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2.2}s`;
    piece.style.width = `${5 + Math.random() * 5}px`;
    piece.style.height = `${7 + Math.random() * 8}px`;
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5500);
  }
}
const audio = document.getElementById("birthdayAudio");

audio.loop = true;

audio.play().catch(() => {
  console.log("Tap the page to start the music.");
});
musicToggle.addEventListener('click', async () => {
  if (birthdayAudio.paused) {
    try {
      await birthdayAudio.play();
      musicToggle.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'Pause our song';
    } catch (error) {
      musicLabel.textContent = 'Add music.mp3 first';
      musicToggle.setAttribute('aria-pressed', 'false');
      window.setTimeout(() => { musicLabel.textContent = 'Play our song'; }, 2400);
    }
  } else {
    birthdayAudio.pause();
    musicToggle.setAttribute('aria-pressed', 'false');
    musicLabel.textContent = 'Play our song';
  }
});

wishButton.addEventListener('click', () => {
  wishResponse.textContent = 'May it find its way to you. Happy birthday, Precious! ♡';
  wishButton.textContent = 'Wish sent 💌';
  wishButton.disabled = true;
  wishButton.style.opacity = '.85';
  launchConfetti(105);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// A gentle burst when the page first opens.
window.addEventListener('load', () => {
  window.setTimeout(() => launchConfetti(32), 350);
});


// Create a gentle stream of hearts behind the page content.
(function createFloatingHearts() {
  const layer = document.createElement('div');
  layer.className = 'hearts-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);

  const hearts = ['♥', '♡', '❤', 'ღ'];
  const colors = ['#ef9bb8', '#d9b9f2', '#f4bfd0', '#e8a6c1', '#cdbce9'];
  const count = window.matchMedia('(max-width: 520px)').matches ? 13 : 20;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'bg-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 22}px`;
    heart.style.setProperty('--heart-color', colors[Math.floor(Math.random() * colors.length)]);
    heart.style.setProperty('--heart-duration', `${10 + Math.random() * 12}s`);
    heart.style.setProperty('--heart-delay', `${-Math.random() * 20}s`);
    heart.style.setProperty('--heart-drift', `${-35 + Math.random() * 70}px`);
    heart.style.setProperty('--heart-opacity', `${0.18 + Math.random() * 0.22}`);
    layer.appendChild(heart);
  }
})();
