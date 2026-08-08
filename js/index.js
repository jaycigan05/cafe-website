// ============================
// PAWFEE CAFÉ — INDEX (HOME) PAGE SCRIPT
// Handles only the interactive bits that need real JavaScript:
// the mobile nav menu and the auto-rotating "Our Story" photo
// slider. Everything else on this page (the Humans/Dogs menu
// toggle, button hover states) is done with pure CSS in index.css
// — no JS involved there.
// ============================

// Single entry point: wait for the page to finish loading, then
// wire up each independent feature. If a feature's HTML isn't on
// the page, its init function just returns early and does nothing.
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initAboutSlider();
  initCopyCafePhone();
});

/* ---- Mobile nav toggle ----
   Opens/closes the hamburger menu (#navToggle) on small screens,
   and auto-closes it again once the visitor taps any nav link. */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  // Toggle the "open" class on both the button (for the X animation)
  // and the link list (for the dropdown), and keep aria-expanded in
  // sync for screen readers.
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

/* ---- "Our Story" image slider: auto-rotates, and can be advanced manually ----
   Cross-fades between the three .about-slide photos inside #aboutImage every 2 seconds.
   Visitors can also click the "next" arrow or one of the generated
   dots to jump straight to a photo, which resets the auto-rotate timer. */
function initAboutSlider() {
  const wrapper = document.getElementById('aboutImage');
  if (!wrapper) return;

  const images = Array.from(wrapper.querySelectorAll('.about-slide'));
  const nextBtn = document.getElementById('aboutImageNext');
  const dotsContainer = document.getElementById('aboutImageDots');
  if (images.length < 2) return; // nothing to slide between

  const AUTO_INTERVAL_MS = 2000; // change photo every 2 seconds
  let current = images.findIndex((img) => img.classList.contains('active'));
  if (current === -1) current = 0;
  let timer = null;

  // Build one dot per image for direct/manual navigation.
  // (.about-image-dot is styled in index.css, but the elements
  // themselves only exist because this loop creates them.)
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

  // Paints whichever image/dot index is "current" as active; everything
  // else loses the .active class (index.css handles the fade via opacity).
  function render() {
    images.forEach((img, i) => img.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  // Wraps the index around (so it loops back to photo 1 after the last one)
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

  // Used whenever a manual click happens, so the auto-rotate
  // countdown doesn't immediately skip past the photo just picked.
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


/* ---- Copy café phone number ----
   Clicking the CTA phone button copies only the displayed phone number
   to the clipboard. A fallback is included for browsers that do not
   provide navigator.clipboard (for example when previewing locally). */
function initCopyCafePhone() {
  const copyButton = document.getElementById('copyCafePhone');
  if (!copyButton) return;

  const label = copyButton.querySelector('.phone-label');
  const phoneNumber = copyButton.dataset.phone || '+60 12-345 6789';
  const originalText = label ? label.textContent : phoneNumber;
  let resetTimer = null;

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback for local/file previews and older browsers.
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    temp.setSelectionRange(0, temp.value.length);
    document.execCommand('copy');
    temp.remove();
  }

  copyButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
      await copyText(phoneNumber);
      if (label) label.textContent = 'Copied!';
      copyButton.setAttribute('aria-label', `Copied ${phoneNumber}`);

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (label) label.textContent = originalText;
        copyButton.setAttribute('aria-label', 'Copy café phone number');
      }, 1500);
    } catch (error) {
      // Keep the number visible if clipboard access is blocked.
      if (label) label.textContent = originalText;
    }
  });
}
