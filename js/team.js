// team.js — the human staff cards are static HTML in team.html now,
// this just wires up their expand/collapse. dog cards still get
// generated here though, from dogData below

const dogData = [
	{ name: "Waffle",      type: "Australian Shepherd" },
	{ name: "Lucy",        type: "Basenji" },
	{ name: "Biscuit",     type: "Beagle" },
	{ name: "Bailey",      type: "Bearded Collie" },
	{ name: "Peanut",      type: "Bernese Mountain" },
	{ name: "Ruby",        type: "Yorkshire Terrier" },
	{ name: "Oreo",        type: "Border Collie" },
	{ name: "Mochi",       type: "Brittany" },
	{ name: "Nala",        type: "Cairn Terrier" },
	{ name: "Zeus",        type: "Cardigan Welsh Cogi" },
	{ name: "Rocky",       type: "Cattle Dog" },
	{ name: "Daisy",       type: "Cavalier King Charles Spaniel" },
	{ name: "Cici",        type: "Corgi" },
	{ name: "Bella",       type: "Dashshund" },
	{ name: "Max",         type: "Dalmatian" },
	{ name: "Ashley",      type: "French Bulldog" },
	{ name: "Charlie",     type: "Golden Retriever" },
	{ name: "Molly",       type: "Labrador Retriever" },
	{ name: "Buddy",       type: "Maltipoo" },
	{ name: "Happy",       type: "Papillon" },
	{ name: "Cooper",      type: "Pomeranian" },
	{ name: "Moana",       type: "Portuguese Water Dog" },
	{ name: "Duke",        type: "Pug" },
	{ name: "Sophie",      type: "Samoyed" },
	{ name: "Hira",        type: "Shibainu" },
	{ name: "Chloe",       type: "Shih Tzu" },
	{ name: "Bear",        type: "Siberian Husky" },
	{ name: "Zoe",         type: "Soft Coated Wheaten" },
	{ name: "Oliver",      type: "Toypoddle" },
	{ name: "Leo",         type: "West Highland White Terrier" },
];

document.addEventListener('DOMContentLoaded', () =>
{
	initStaffCards();
	renderDogs();
});

// click a staff card to expand it — cards are already in the HTML,
// just toggling a class here
function initStaffCards()
{
	const staffGrid = document.getElementById('staffGrid');
	const modal = document.getElementById('staffModal');
	const modalScroll = document.getElementById('staffModalScroll');
	const modalClose = document.getElementById('staffModalClose');
	const backdrop = document.getElementById('staffBackdrop');
	if (!staffGrid || !modal || !modalScroll) return;

	const cards = Array.from(staffGrid.querySelectorAll('.staff-card'));
	if (!cards.length) return;

	// remembers whichever card opened the modal, so closing it can send
	// keyboard focus back to that card instead of losing it to <body>
	let triggerCard = null;

	const openModal = (card) =>
	{
		const source = card.querySelector('.staff-card-scroll');
		if (!source) return;
		modalScroll.innerHTML = source.innerHTML;
		modal.classList.add('active');
		modal.setAttribute('aria-hidden', 'false');
		if (backdrop) backdrop.classList.add('active');
		document.body.style.overflow = 'hidden';
		cards.forEach((c) => c.setAttribute('aria-expanded', String(c === card)));
		triggerCard = card;
		modalClose.focus();
	};

	const closeModal = () =>
	{
		modal.classList.remove('active');
		modal.setAttribute('aria-hidden', 'true');
		if (backdrop) backdrop.classList.remove('active');
		document.body.style.overflow = '';
		cards.forEach((c) => c.setAttribute('aria-expanded', 'false'));
		if (triggerCard) triggerCard.focus();
		triggerCard = null;
	};

	// keeps Tab/Shift+Tab cycling through the modal's own controls while
	// it's open, instead of walking out past it into the rest of the
	// page (previously: out of the modal, straight to the footer, since
	// nothing else between the modal and the footer is focusable)
	const trapFocus = (e) =>
	{
		if (e.key !== 'Tab' || !modal.classList.contains('active')) return;

		const focusable = Array.from(
			modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
		).filter((el) => el.offsetParent !== null);
		if (!focusable.length) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey && document.activeElement === first)
		{
			e.preventDefault();
			last.focus();
		}
		else if (!e.shiftKey && document.activeElement === last)
		{
			e.preventDefault();
			first.focus();
		}
	};

	cards.forEach((card) =>
	{
		card.addEventListener('click', (e) =>
		{
			if (e.target.closest('.staff-portfolio-btn')) return;
			openModal(card);
		});

		card.addEventListener('keydown', (e) =>
		{
			if (e.target.closest('.staff-portfolio-btn')) return;
			if (e.key === 'Enter' || e.key === ' ')
			{
				e.preventDefault();
				openModal(card);
			}
		});
	});

	if (modalClose) modalClose.addEventListener('click', closeModal);
	if (backdrop) backdrop.addEventListener('click', closeModal);

	document.addEventListener('keydown', (e) =>
	{
		if (e.key === 'Escape' && modal.classList.contains('active'))
		{
			closeModal();
			return;
		}
		trapFocus(e);
	});
}

/* ---- Resident dogs ---- */
function renderDogs()
{
	const dogGrid = document.getElementById('dogGrid');
	if (!dogGrid) return;

	dogData.forEach((dog, index) =>
	{
		const card = document.createElement('div');
		card.className = 'dog-card';

		const imgNumber = String(index + 1).padStart(2, '0');

		card.innerHTML = `
	  <img src="../images/dogs/dog-${imgNumber}.avif" alt="${dog.name}, resident dog" loading="lazy">
	  <span class="dog-name">${dog.name}</span>
	  <span class="dog-type">${dog.type}</span>
	`;

		dogGrid.appendChild(card);
	});
}