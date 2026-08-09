// theme.js — day/night toggle, shared by every page. loaded in <head>
// so the saved theme applies before first paint (no flash of the
// wrong colours), the click handler just waits for the button to exist.

(function ()
{
	const saved = localStorage.getItem('pawfeeTheme');
	if (saved === 'dark')
	{
		document.documentElement.setAttribute('data-theme', 'dark');
	}
})();

document.addEventListener('DOMContentLoaded', () =>
{
	const toggle = document.getElementById('themeToggle');
	if (!toggle) return;

	const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

	// sync the button's own state with whatever theme actually got applied
	toggle.setAttribute('aria-pressed', String(isDark()));
	toggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');

	toggle.addEventListener('click', () =>
	{
		const goingDark = !isDark();

		if (goingDark)
		{
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		else
		{
			document.documentElement.removeAttribute('data-theme');
		}

		localStorage.setItem('pawfeeTheme', goingDark ? 'dark' : 'light');
		toggle.setAttribute('aria-pressed', String(goingDark));
		toggle.setAttribute('aria-label', goingDark ? 'Switch to light mode' : 'Switch to dark mode');
	});
});
