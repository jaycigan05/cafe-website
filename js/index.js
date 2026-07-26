// ============================
// PAWFEE CAFÉ — SITE SCRIPT
// ============================

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initPawCursor();
  initAboutSlider();
});

/* ---- Mobile nav toggle ---- */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after tapping a link (mobile)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- "Our Story" image slider: auto-rotates, and can be advanced manually ---- */
function initAboutSlider() {
  const wrapper = document.getElementById('aboutImage');
  if (!wrapper) return;

  const images = Array.from(wrapper.querySelectorAll('img'));
  const nextBtn = document.getElementById('aboutImageNext');
  const dotsContainer = document.getElementById('aboutImageDots');
  if (images.length < 2) return;

  const AUTO_INTERVAL_MS = 2000; // change photo every 2 seconds
  let current = images.findIndex((img) => img.classList.contains('active'));
  if (current === -1) current = 0;
  let timer = null;

  // Build one dot per image for direct/manual navigation
  const dots = images.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'about-image-dot';
    dot.setAttribute('aria-label', `Show photo ${i + 1}`);
    if (dotsContainer) dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => {
      goToSlide(i);
      restartAutoplay();
    });
    return dot;
  });

  function render() {
    images.forEach((img, i) => img.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function goToSlide(index) {
    current = (index + images.length) % images.length;
    render();
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function startAutoplay() {
    timer = setInterval(nextSlide, AUTO_INTERVAL_MS);
  }

  function restartAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  // Pause the auto-rotation while the visitor is looking closely at the image
  wrapper.addEventListener('mouseenter', () => clearInterval(timer));
  wrapper.addEventListener('mouseleave', startAutoplay);

  render();
  startAutoplay();
}

/* ---- Cursor-follow paw prints in the hero ---- */
function initPawCursor() {
  const layer = document.getElementById('pawCursorLayer');
  if (!layer) return;

  let lastStamp = 0;
  const minInterval = 120; // ms between paw prints

  layer.parentElement.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastStamp < minInterval) return;
    lastStamp = now;

    const rect = layer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const paw = document.createElement('span');
    paw.className = 'paw-print';
    paw.textContent = '🐾';
    paw.style.left = `${x}px`;
    paw.style.top = `${y}px`;
    paw.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 40 - 20}deg)`;

    layer.appendChild(paw);
    paw.addEventListener('animationend', () => paw.remove());
  });
}