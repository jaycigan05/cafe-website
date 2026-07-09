// ============================================================
// PAWFEE CAFÉ - main.js
// Handles: onboarding tooltip, theme toggle (coming soon)
// ============================================================

// ---- ONBOARDING TOOLTIP ----

// check if user just logged in from register page
const justLoggedIn = localStorage.getItem('justLoggedIn');

if (justLoggedIn === 'true') {
  localStorage.removeItem('justLoggedIn');
  showTooltip();
}

function showTooltip() {
  const overlay  = document.getElementById('tooltip-overlay');
  const box      = document.getElementById('tooltip-box');
  const arrow    = document.getElementById('tooltip-arrow');
  const closeBtn = document.getElementById('tooltip-close');

  // find the Menu nav link to point at
  const menuLink = document.querySelector('.nav-links a[href="menu.html"]');

  if (!menuLink || !overlay) return;

  // show the overlay
  overlay.classList.remove('hidden');

  // get exact screen position of the Menu link
  const rect = menuLink.getBoundingClientRect();

  // position arrow directly above the Menu link
  arrow.style.left = (rect.left + rect.width / 2 - 10) + 'px';
  arrow.style.top  = (rect.bottom + 4) + 'px';

  // position tooltip box below the arrow
  box.style.left = (rect.left + rect.width / 2 - 130) + 'px';
  box.style.top  = (rect.bottom + 16) + 'px';

  // close button hides tooltip
  closeBtn.addEventListener('click', function() {
    overlay.classList.add('hidden');
  });
}