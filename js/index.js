// index.js — nav toggle + the "Our Story" slider, plus a couple of
// small bits (phone copy, hero video pause button) reused by
// team.html/reviews.html since they load this file too.

// wait for the DOM then wire everything up. each init function
// bails out early if its HTML isn't on the page, so it's safe to
// call all of them even on pages that don't have all of them
document.addEventListener('DOMContentLoaded', () =>
{
	initNavToggle();
	initAboutSlider();
	initCopyCafePhone();
	initHeroVideoToggle();
});

// opens/closes the hamburger menu, closes itself again once you tap a link
function initNavToggle()
{
	const toggle = document.getElementById('navToggle');
	const links = document.getElementById('navLinks');

	if (!toggle || !links) return;

	// flip the "open" class on both the button (X animation) and the
	// list (dropdown), keep aria-expanded synced for screen readers
	toggle.addEventListener('click', () =>
	{
		const isOpen = links.classList.toggle('open');
		toggle.classList.toggle('open', isOpen);
		toggle.setAttribute('aria-expanded', String(isOpen));
	});

	// tapping any link on mobile should close the menu again
	links.querySelectorAll('a').forEach((link) =>
	{
		link.addEventListener('click', () =>
		{
			links.classList.remove('open');
			toggle.classList.remove('open');
			toggle.setAttribute('aria-expanded', 'false');
		});
	});
}

// cross-fades the 3 "Our Story" photos every 2s. next arrow / dots
// let you jump straight to one, which just resets the auto timer
function initAboutSlider()
{
	const wrapper = document.getElementById('aboutImage');
	if (!wrapper) return;

	const images = Array.from(wrapper.querySelectorAll('.about-slide'));
	const nextBtn = document.getElementById('aboutImageNext');
	const dotsContainer = document.getElementById('aboutImageDots');
	const pauseToggle = document.getElementById('aboutImageToggle');
	if (images.length < 2) return; // nothing to slide between

	const AUTO_INTERVAL_MS = 2000; // 2s per photo
	let current = images.findIndex((img) => img.classList.contains('active'));
	if (current === -1) current = 0;
	let timer = null;
	// true once someone's explicitly hit pause — keeps hover/focus
	// leaving the slider from silently restarting it against their wishes
	let manuallyPaused = false;

	// one dot per photo — .about-image-dot styling lives in index.css,
	// the dots themselves only exist because this loop makes them
	const dots = images.map((_, i) =>
	{
		const dot = document.createElement('button');
		dot.type = 'button';
		dot.className = 'about-image-dot';
		dot.setAttribute('aria-label', `Show photo ${i + 1}`);
		if (dotsContainer) dotsContainer.appendChild(dot);
		dot.addEventListener('click', () =>
		{
			goToSlide(i);
			restartAutoplay();
		});
		return dot;
	});

	// marks "current" as active, everything else loses .active
	// (the actual fade is just opacity in index.css)
	function render()
	{
		images.forEach((img, i) => img.classList.toggle('active', i === current));
		dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
	}

	// wraps back to photo 1 after the last one
	function goToSlide(index)
	{
		current = (index + images.length) % images.length;
		render();
	}

	function nextSlide()
	{
		goToSlide(current + 1);
	}

	function startAutoplay()
	{
		timer = setInterval(nextSlide, AUTO_INTERVAL_MS);
	}

	// call this after a manual click so autoplay doesn't immediately
	// skip past the photo someone just picked
	function restartAutoplay()
	{
		clearInterval(timer);
		startAutoplay();
	}

	if (nextBtn)
	{
		nextBtn.addEventListener('click', () =>
		{
			nextSlide();
			restartAutoplay();
		});
	}

	// pause while someone's hovering over or keyboard-focused inside the
	// image (hover alone leaves keyboard/touch users with no way to stop it)
	wrapper.addEventListener('mouseenter', () => clearInterval(timer));
	wrapper.addEventListener('mouseleave', () =>
	{
		if (!manuallyPaused) startAutoplay();
	});
	wrapper.addEventListener('focusin', () => clearInterval(timer));
	wrapper.addEventListener('focusout', () =>
	{
		if (!manuallyPaused) startAutoplay();
	});

	// explicit pause/play button — WCAG 2.2.2 wants a real control for
	// this, not just "stops while your mouse happens to be over it"
	if (pauseToggle)
	{
		const icon = pauseToggle.querySelector('span');
		pauseToggle.addEventListener('click', () =>
		{
			manuallyPaused = !manuallyPaused;
			if (manuallyPaused)
			{
				clearInterval(timer);
				pauseToggle.setAttribute('aria-label', 'Play photo slideshow');
				pauseToggle.setAttribute('aria-pressed', 'true');
				if (icon) icon.textContent = '▶';
			}
			else
			{
				startAutoplay();
				pauseToggle.setAttribute('aria-label', 'Pause photo slideshow');
				pauseToggle.setAttribute('aria-pressed', 'false');
				if (icon) icon.textContent = '⏸';
			}
		});
	}

	render();
	startAutoplay();
}

// click-to-copy the café phone number. falls back to the old
// execCommand trick when navigator.clipboard isn't available
// (mainly happens when previewing the site straight from a file:// path)
function initCopyCafePhone()
{
	const copyButton = document.getElementById('copyCafePhone');
	if (!copyButton) return;

	const label = copyButton.querySelector('.phone-label');
	const phoneNumber = copyButton.dataset.phone || '+60 12-345 6789';
	const originalText = label ? label.textContent : phoneNumber;
	let resetTimer = null;

	async function copyText(text)
	{
		if (navigator.clipboard && window.isSecureContext)
		{
			await navigator.clipboard.writeText(text);
			return;
		}

		// old-school fallback for local file previews / older browsers
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

	copyButton.addEventListener('click', async (event) =>
	{
		event.preventDefault();

		try
		{
			await copyText(phoneNumber);
			if (label) label.textContent = 'Copied!';
			copyButton.setAttribute('aria-label', `Copied ${phoneNumber}`);

			clearTimeout(resetTimer);
			resetTimer = setTimeout(() =>
			{
				if (label) label.textContent = originalText;
				copyButton.setAttribute('aria-label', 'Copy café phone number');
			}, 1500);
		}
		catch (error)
		{
			// clipboard access blocked — just leave the number showing
			if (label) label.textContent = originalText;
		}
	});
}

// lets people stop the looping background hero video (index's
// .hero-video or reviews' .video) instead of it just running forever
// with no way to turn it off
function initHeroVideoToggle()
{
	const video = document.querySelector('.hero-video, .video');
	const toggle = document.getElementById('heroVideoToggle');
	if (!video || !toggle) return;

	const icon = toggle.querySelector('span');

	toggle.addEventListener('click', () =>
	{
		if (video.paused)
		{
			video.play();
			toggle.setAttribute('aria-label', 'Pause background video');
			toggle.setAttribute('aria-pressed', 'false');
			if (icon) icon.textContent = '⏸';
		}
		else
		{
			video.pause();
			toggle.setAttribute('aria-label', 'Play background video');
			toggle.setAttribute('aria-pressed', 'true');
			if (icon) icon.textContent = '▶';
		}
	});
}
