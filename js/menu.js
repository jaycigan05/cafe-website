/* =========================================================
   Pawfee Cafe — Menu Page Logic
   Plain JavaScript only (no libraries), per assignment brief.
   ========================================================= */

/* ---------------------------------------------------------
   1. CATEGORY DEFINITIONS
   --------------------------------------------------------- */
const CATEGORIES = [
  { id: 'all',                label: 'All Dishes' },
  { id: 'mains',               label: 'Mains' },
  { id: 'pasta-pizza',         label: 'Pasta & Pizza' },
  { id: 'burgers-sandwiches',  label: 'Burgers & Sandwiches' },
  { id: 'snacks-desserts',     label: 'Snacks & Desserts' },
  { id: 'beverages',           label: 'Beverages' },
  { id: 'paw',                 label: 'Paw Menu' },
];

/** Builds the "photo" area shared by category cards, podium cards
 *  and menu cards. */
function mediaMarkup(category, image, name) {
  return `<img class="card-media-inner media-${category}" src="${image}" alt="${name}" loading="lazy">`;
}

/* ---------------------------------------------------------
   2. MENU DATA
   --------------------------------------------------------- */
const MENU_ITEMS = [
  // ---------- Mains ----------
  { id:'mn1', name:'Fish & Chips', category:'mains', price:17.90,
    image:'../images/menu/Mains/Fish&Chips.jpg',
    desc:'Crispy golden battered fish fillet served with seasoned French fries and tangy tartar sauce.',
    ingredients:'Fish fillet, batter, potatoes, tartar sauce, lemon',
    topSeller:false, popularity:88 },
  { id:'mn2', name:'Crispy Chicken Chop', category:'mains', price:17.90,
    image:'../images/menu/Mains/Crispy_Chicken_Chop.jpg',
    desc:'Deep-fried chicken chop with a crunchy coating, served with fries and fresh salad.',
    ingredients:'Chicken thigh, breadcrumb coating, peppercorn sauce, mashed potato, mixed salad',
    topSeller:false, popularity:82 },
  { id:'mn3', name:'Grilled Chicken Chop', category:'mains', price:16.90,
    image:'../images/menu/Mains/Grilled_Chicken_Chop.jpg',
    desc:'Char-grilled chicken chop glazed in smoky BBQ sauce.',
    ingredients:'Chicken thigh, bbq glaze, vegetables, potatoes',
    topSeller:true, popularity:99 },
  { id:'mn4', name:'Teriyaki Chicken Rice', category:'mains', price:15.90,
    image:'../images/menu/Mains/Teriyaki_Chicken_Rice.jpg',
    desc:'Grilled chicken glazed in teriyaki sauce over steamed rice.',
    ingredients:'Chicken thigh, teriyaki sauce, steamed rice, sesame seeds, mixed salad',
    topSeller:false, popularity:79 },
  { id:'mn5', name:'Japanese Chicken Curry Rice', category:'mains', price:16.90,
    image:'../images/menu/Mains/Japanese_Chicken_Curry_Rice.jpg',
    desc:'Comforting Japanese-style sweet curry with crispy chicken cutlet and soft-cooked vegetables.',
    ingredients:'Chicken cutlet, Japanese curry roux, potatoes, carrots, onions, rice',
    topSeller:false, popularity:74 },
  { id:'mn6', name:'Butter Chicken Rice', category:'mains', price:17.90,
    image:'../images/menu/Mains/Butter_Chicken_Rice.jpg',
    desc:'Fragrant chicken pieces coated in a rich, creamy, and mildly spiced butter sauce over rice.',
    ingredients:'Chicken, butter, cream, curry leaves, chili, garlic, white rice',
    topSeller:false, popularity:85 },

  // ---------- Pasta & Pizza ----------
  { id:'pz1', name:'Carbonara', category:'pasta-pizza', price:17.90,
    image:'../images/menu/Pasta&Pizza/Carbonara.jpg',
    desc:'Classic creamy carbonara with crispy pancetta and parmesan.',
    ingredients:'Spaghetti, cream, egg yolk, pancetta, parmesan, black pepper',
    topSeller:true, popularity:97 },
  { id:'pz2', name:'Aglio Olio', category:'pasta-pizza', price:15.90,
    image:'../images/menu/Pasta&Pizza/Aglio_Olio.jpg',
    desc:'Garlic and chili-infused olive oil spaghetti.',
    ingredients:'Spaghetti, garlic, chili flakes, olive oil, parsley',
    topSeller:false, popularity:80 },
  { id:'pz3', name:'Spaghetti Bolognese', category:'pasta-pizza', price:16.90,
    image:'../images/menu/Pasta&Pizza/Spaghetti_Bolognese.jpg',
    desc:'Hearty spaghetti served with a slow-cooked, rich savory beef tomato ragù sauce.',
    ingredients:'Spaghetti, minced beef, tomatoes, onions, garlic, herbs, parmesan',
    topSeller:false, popularity:83 },
  { id:'pz4', name:'Creamy Mushroom Pasta', category:'pasta-pizza', price:17.90,
    image:'../images/menu/Pasta&Pizza/Creamy_Mushroom_Pasta.jpg',
    desc:'Fettuccine tossed in a rich creamy mushroom sauce.',
    ingredients:'Fettuccine, mushroom, cream, garlic, parmesan',
    topSeller:false, popularity:77 },
  { id:'pz5', name:'Pepperoni Pizza', category:'pasta-pizza', price:20.90,
    image:'../images/menu/Pasta&Pizza/Pepperoni_Pizza.jpg',
    desc:'Crispy pizza topped with rich tomato sauce, melted mozzarella, and savory beef pepperoni.',
    ingredients:'Pizza dough, tomato sauce, mozzarella cheese, beef pepperoni, oregano',
    topSeller:false, popularity:90 },
  { id:'pz6', name:'BBQ Chicken Pizza', category:'pasta-pizza', price:21.90,
    image:'../images/menu/Pasta&Pizza/BBQ_Chicken_Pizza.jpg',
    desc:'Baked pizza topped with smoky BBQ sauce, grilled chicken pieces, red onions, and melted cheese.',
    ingredients:'Pizza dough, BBQ sauce, grilled chicken, mozzarella, red onions, cilantro',
    topSeller:false, popularity:86 },
  { id:'pz7', name:'Hawaiian Pizza', category:'pasta-pizza', price:19.90,
    image:'../images/menu/Pasta&Pizza/Hawaiian_Pizza.jpg',
    desc:'Classic pizza layered with savory chicken ham, juicy pineapple chunks, and mozzarella cheese.',
    ingredients:'Pizza dough, tomato sauce, mozzarella cheese, chicken ham, pineapple chunks',
    topSeller:false, popularity:68 },

  // ---------- Burgers & Sandwiches ----------
  { id:'bs1', name:'Beef Burger', category:'burgers-sandwiches', price:20.90,
    image:'../images/menu/Burgers&Sandwiches/Beef_Burger.jpg',
    desc:'Juicy beef patty topped with cheese, fresh lettuce, tomatoes, and house burger sauce.',
    ingredients:'Beef patty, burger bun, cheddar cheese, lettuce, tomatoes, pickles, sauce',
    topSeller:false, popularity:93 },
  { id:'bs2', name:'Crispy Chicken Burger', category:'burgers-sandwiches', price:18.90,
    image:'../images/menu/Burgers&Sandwiches/Crispy_Chicken_Burger.jpg',
    desc:'Extra crunchy chicken thigh topped with crisp lettuce and mayo in a toasted bun.',
    ingredients:'Fried chicken thigh, burger bun, mayo, lettuce, tomatoes, cheese slice',
    topSeller:false, popularity:84 },
  { id:'bs3', name:'Fish Burger', category:'burgers-sandwiches', price:16.90,
    image:'../images/menu/Burgers&Sandwiches/Fish_Burger.jpg',
    desc:'Golden fish fillet topped with crisp lettuce and creamy tartar sauce in a warm bun.',
    ingredients:'Crispy fish fillet, burger bun, tartar sauce, lettuce, cheese',
    topSeller:false, popularity:71 },
  { id:'bs4', name:'Club Sandwich', category:'burgers-sandwiches', price:14.90,
    image:'../images/menu/Burgers&Sandwiches/Club_Sandwich.jpg',
    desc:'Triple-decker toasted sandwich stacked with chicken, ham, fried egg, lettuce, cheese and tomato.',
    ingredients:'Toast bread, chicken breast, fried egg, lettuce, tomatoes, mayo, cheese',
    topSeller:false, popularity:65 },

  // ---------- Snacks & Desserts ----------
  { id:'sd1', name:'French Fries', category:'snacks-desserts', price:11.90,
    image:'../images/menu/Snacks&Desserts/French_Fries.jpg',
    desc:'Crispy golden potato fries lightly seasoned with sea salt.',
    ingredients:'Potatoes, sea salt',
    topSeller:false, popularity:76 },
  { id:'sd2', name:'Onion Rings', category:'snacks-desserts', price:10.90,
    image:'../images/menu/Snacks&Desserts/Onion_Rings.jpg',
    desc:'Thick-cut onion rings fried in a crunchy batter, served with dipping sauce.',
    ingredients:'Onions, batter, breadcrumb, dip sauce',
    topSeller:false, popularity:62 },
  { id:'sd3', name:'Waffle with Ice Cream', category:'snacks-desserts', price:19.90,
    image:'../images/menu/Snacks&Desserts/Waffle_with_Ice_Cream.jpg',
    desc:'Warm and crispy waffle topped with vanilla ice cream.',
    ingredients:'Waffle batter, vanilla ice cream, maple syrup',
    topSeller:false, popularity:89 },
  { id:'sd4', name:'Pudding', category:'snacks-desserts', price:14.90,
    image:'../images/menu/Snacks&Desserts/Pudding.jpg',
    desc:'Smooth and silky caramel pudding topped with sweet berry sauce.',
    ingredients:'Eggs, milk, caramel, vanilla, berry sauce',
    topSeller:false, popularity:58 },
  { id:'sd5', name:'Strawberry Cake', category:'snacks-desserts', price:16.90,
    image:'../images/menu/Snacks&Desserts/Strawberry_Cake.jpg',
    desc:'Soft vanilla sponge cake layered with fresh whipped cream and sweet strawberries',
    ingredients:'Sponge cake, fresh strawberries, whipped cream',
    topSeller:false, popularity:81 },
  { id:'sd6', name:'Cheesecake', category:'snacks-desserts', price:16.90,
    image:'../images/menu/Snacks&Desserts/Cheesecake.jpg',
    desc:'Rich, creamy, classic baked cheesecake on a buttery biscuit base.',
    ingredients:'Cream cheese, graham cracker crust, butter, sugar, eggs, vanilla',
    topSeller:false, popularity:87 },

  // ---------- Beverages ----------
  { id:'bv1', name:'Cappuccino', category:'beverages', price:15.90,
    image:'../images/menu/Beverages/Cappuccino.jpg',
    desc:'Rich espresso topped with equal parts steamed milk and velvety milk foam.',
    ingredients:'Espresso, steamed milk, milk foam',
    topSeller:false, popularity:78 },
  { id:'bv2', name:'Americano', category:'beverages', price:15.90,
    image:'../images/menu/Beverages/Americano.jpg',
    desc:'Bold espresso shots diluted with hot water for a smooth coffee finish.',
    ingredients:'Espresso, hot water',
    topSeller:false, popularity:55 },
  { id:'bv3', name:'Latte', category:'beverages', price:13.90,
    image:'../images/menu/Beverages/Latte.jpg',
    desc:'Smooth and creamy coffee made with rich espresso and soft steamed milk.',
    ingredients:'Espresso, steamed milk',
    topSeller:false, popularity:72 },
  { id:'bv4', name:'Matcha Latte', category:'beverages', price:15.90,
    image:'../images/menu/Beverages/Matcha_Latte.jpg',
    desc:'Premium Japanese green tea powder whisked and mixed with creamy steamed milk.',
    ingredients:'Matcha powder, steamed milk, honey',
    topSeller:true, popularity:95 },
  { id:'bv5', name:'Lemon Tea', category:'beverages', price:9.90,
    image:'../images/menu/Beverages/Lemon_Tea.jpg',
    desc:'Refreshing black tea with fresh lemon.',
    ingredients:'Black tea, lemon, honey',
    topSeller:false, popularity:60 },
  { id:'bv6', name:'Boba Milk Tea', category:'beverages', price:13.90,
    image:'../images/menu/Beverages/Boba_Milk_Tea.jpg',
    desc:'Classic sweet milk tea served with chewy brown sugar tapioca pearls.',
    ingredients:'Black tea, milk, tapioca pearls, brown sugar syrup',
    topSeller:false, popularity:91 },
  { id:'bv7', name:'Mango Smoothie', category:'beverages', price:15.90,
    image:'../images/menu/Beverages/Mango_Smoothie.jpg',
    desc:'Chilled and creamy blended smoothie made from sweet ripe mangoes and yogurt',
    ingredients:'Mango, yogurt, honey, ice',
    topSeller:false, popularity:75 },

  // ---------- Paw Menu (for dogs) ----------
  { id:'pw1', name:'Pumpkin Pancakes', category:'paw', price:15.90,
  image:'../images/menu/Paw_Menu/Pumpkin_Pancakes.jpg',
  desc:'Fluffy mini pancakes made with real pumpkin, no sugar added.',
  ingredients:'Pumpkin puree, oat flour, goat milk, eggs',
  topSeller:true, popularity:95 },
  { id:'pw2', name:'Dog Biscuits', category:'paw', price:14.90,
    image:'../images/menu/Paw_Menu/Dog_Biscuits.jpg',
    desc:'Crunchy baked bone-shaped treats packed with natural peanut butter.',
    ingredients:'Oat flour, unsalted dog-safe peanut butter, pumpkin, eggs, yogurt frosting',
    topSeller:true, popularity:97 },
  { id:'pw3', name:'Apple Dognuts', category:'paw', price:11.90,
  image:'../images/menu/Paw_Menu/Apple_Dognuts.jpg',
  desc:'Grain-free "donut" treat with apple and a hint of cinnamon.',
  ingredients:'Oat flour, apple puree, cinnamon, plain Greek yogurt topping',
  topSeller:false, popularity:80 },
  { id:'pw4', name:'Paw Meatballs', category:'paw', price:15.90,
    image:'../images/menu/Paw_Menu/Paw_Meatballs.jpg',
    desc:'Steamed savory meatballs made with lean minced meat and finely diced veggies.',
    ingredients:'Lean minced beef and chicken, carrots, oats, egg',
    topSeller:false, popularity:74 },
  { id:'pw5', name:'Chicken & Pumpkin Bowl', category:'paw', price:16.90,
    image:'../images/menu/Paw_Menu/Chicken&Pumpkin_Bowl.jpg',
    desc:'Gently steamed chicken, green beans and pumpkin mash for pups.',
    ingredients:'Chicken breast, pumpkin,green beans, brown rice',
    topSeller:false, popularity:88 },
  { id:'pw6', name:'Salmon & Sweet Potato Bowl', category:'paw', price:17.90,
    image:'../images/menu/Paw_Menu/Salmon&Sweet_Potato_Bowl.jpg',
    desc:'Steamed fresh salmon paired with mashed sweet potatoes for coat and skin health.',
    ingredients:'Fresh salmon, mashed sweet potato, green beans',
    topSeller:false, popularity:89 },
  { id:'pw7', name:'Blueberry Pupcakes', category:'paw', price:15.90,
  image:'../images/menu/Paw_Menu/Blueberry_Pupcakes.jpg',
  desc:'Mini cupcake with fresh blueberries and a yogurt frosting.',
  ingredients:'Oat flour, blueberries, plain yogurt',
  topSeller:true, popularity:99 },
];

/* ---------------------------------------------------------
   3. STATE
   --------------------------------------------------------- */
const state = {
  category: 'all',   // which accordion panel is open ('' = closed)
  query: '',
  sort: 'popular',
};

/* ---------------------------------------------------------
   4. NAV — mobile menu toggle
   --------------------------------------------------------- */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

/* ---------------------------------------------------------
   5. CATEGORY CARDS (accordion)
   --------------------------------------------------------- */
const categoryRow = document.getElementById('categoryRow');
const accordion = document.getElementById('menuAccordion');

CATEGORIES.forEach(cat => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `category-card cat-photo-${cat.id}`;
  btn.dataset.cat = cat.id;
  btn.setAttribute('aria-expanded', String(cat.id === state.category));
  btn.setAttribute('aria-controls', 'menuAccordion');
  btn.innerHTML = `<span class="category-card-label">${cat.label}</span>`;
  if (cat.id === state.category) btn.classList.add('active');
  btn.addEventListener('click', () => selectCategory(cat.id));
  categoryRow.appendChild(btn);
});

function selectCategory(catId) {
  const reopening = catId !== state.category;
  state.category = reopening ? catId : '';

  [...categoryRow.children].forEach(b => {
    const isActive = b.dataset.cat === state.category;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-expanded', String(isActive));
  });

  accordion.classList.toggle('open', !!state.category);
  renderGrid();
}

/* ---------------------------------------------------------
   6. SEARCH
   --------------------------------------------------------- */
const searchInput = document.getElementById('searchInput');
let debounceTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    state.query = e.target.value.trim().toLowerCase();
    if (state.query && !state.category) selectCategory('all');
    else renderGrid();
  }, 180);
});

/* ---------------------------------------------------------
   7. CUSTOM SORT DROPDOWN
   --------------------------------------------------------- */
const sortWrap = document.getElementById('sortSelect');
const sortTrigger = document.getElementById('sortTrigger');
const sortValueLabel = document.getElementById('sortValueLabel');
const sortList = document.getElementById('sortList');
const sortOptions = [...sortList.querySelectorAll('li')];

function closeSortList() {
  sortWrap.classList.remove('open');
  sortTrigger.setAttribute('aria-expanded', 'false');
}
function openSortList() {
  sortWrap.classList.add('open');
  sortTrigger.setAttribute('aria-expanded', 'true');
}
sortTrigger.addEventListener('click', () => {
  sortWrap.classList.contains('open') ? closeSortList() : openSortList();
});
document.addEventListener('click', (e) => {
  if (!sortWrap.contains(e.target)) closeSortList();
});
sortTrigger.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); openSortList(); sortOptions[0].focus(); }
});
sortOptions.forEach((li, i) => {
  li.tabIndex = -1;
  li.addEventListener('click', () => chooseSortOption(li));
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chooseSortOption(li); }
    if (e.key === 'ArrowDown') { e.preventDefault(); (sortOptions[i + 1] || sortOptions[0]).focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (sortOptions[i - 1] || sortOptions[sortOptions.length - 1]).focus(); }
    if (e.key === 'Escape') { closeSortList(); sortTrigger.focus(); }
  });
});
function chooseSortOption(li) {
  sortOptions.forEach(o => o.setAttribute('aria-selected', 'false'));
  li.setAttribute('aria-selected', 'true');
  sortValueLabel.textContent = li.textContent.replace(' ✓', '');
  state.sort = li.dataset.value;
  closeSortList();
  sortTrigger.focus();
  renderGrid();
}

/* ---------------------------------------------------------
   8. MENU CARD BUILDER
   --------------------------------------------------------- */
function buildCard(item, index) {
  const card = document.createElement('article');
  card.className = 'menu-card';
  card.dataset.delay = Math.min(index, 9);

  const badge = item.topSeller
    ? `<span class="badge top-seller">🏅 Top Seller</span>`
    : '';
  
  card.innerHTML = `
    ${badge}
    <div class="card-shape">
      <div class="card-media">
        ${mediaMarkup(item.category, item.image, item.name)}
      </div>
      <div class="card-divider"></div>
      <div class="card-body">
        <div class="card-title-row">
          <h3>${item.name}</h3>
          <span class="card-price">RM ${item.price.toFixed(2)}</span>
        </div>
        <p class="card-desc">${item.desc}</p>
        <p class="card-ingredients">Ingredients <span>— ${item.ingredients}</span></p>
      </div>
    </div>
  `;
  return card;
}

/* ---------------------------------------------------------
   9. GRID RENDER (filter + search + sort)
   --------------------------------------------------------- */
const grid = document.getElementById('menuGrid');
const resultsStatus = document.getElementById('resultsStatus');

let revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function getFilteredItems() {
  let items = MENU_ITEMS.filter(item => {
    const matchCat = (!state.category || state.category === 'all')
      ? true : item.category === state.category;
    const matchQuery = state.query
      ? (item.name.toLowerCase().includes(state.query) || item.ingredients.toLowerCase().includes(state.query))
      : true;
    return matchCat && matchQuery;
  });

  switch (state.sort) {
    case 'price-asc':  items.sort((a, b) => a.price - b.price); break;
    case 'price-desc': items.sort((a, b) => b.price - a.price); break;
    case 'name-asc':   items.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'popular':
    default:           items.sort((a, b) => b.popularity - a.popularity); break;
  }
  return items;
}

function renderGrid() {
  if (!state.category) {
    grid.innerHTML = '';
    resultsStatus.textContent = '';
    return;
  }

  const items = getFilteredItems();
  grid.classList.add('is-fading');

  setTimeout(() => {
    grid.innerHTML = '';
    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="paw-icon" aria-hidden="true">🐾</span>
          No dishes found — try another search or category.
        </div>`;
    } else {
      items.forEach((item, i) => {
        const card = buildCard(item, i);
        grid.appendChild(card);
        revealObserver.observe(card);
      });
    }
    grid.classList.remove('is-fading');

    resultsStatus.textContent = `${items.length} dish${items.length === 1 ? '' : 'es'} found`;

    requestAnimationFrame(() => {
      [...grid.children].forEach(c => {
        if (c.getBoundingClientRect().top < window.innerHeight) c.classList.add('in-view');
      });
    });
  }, 160);
}
renderGrid();

/* ---------------------------------------------------------
   10. TOP-3 PODIUM — static ranking
   --------------------------------------------------------- */
const podiumSlots = {
  left:   document.querySelector('.podium-slot[data-slot="left"]'),
  center: document.querySelector('.podium-slot[data-slot="center"]'),
  right:  document.querySelector('.podium-slot[data-slot="right"]'),
};
const PODIUM_LAYOUT = [
  { slot: 'center', rank: 1, medal: '🥇' },
  { slot: 'left',   rank: 2, medal: '🥈' },
  { slot: 'right',  rank: 3, medal: '🥉' },
];

function topThree(flavor) {
  const pool = flavor === 'dog'
    ? MENU_ITEMS.filter(i => i.category === 'paw')
    : MENU_ITEMS.filter(i => i.category !== 'paw');
  return [...pool].sort((a, b) => b.popularity - a.popularity).slice(0, 3);
}

function fillSlot(slotEl, item, rank, medal) {
  slotEl.querySelector('.podium-media').innerHTML = mediaMarkup(item.category, item.image, item.name);
  slotEl.querySelector('.podium-name').textContent = item.name;
  slotEl.querySelector('.podium-rank-label').textContent = `#${rank} best seller`;
  slotEl.querySelector('.podium-medal').textContent = medal;
}

function paintPodium(flavor, animate) {
  const items = topThree(flavor);

  PODIUM_LAYOUT.forEach(({ slot, rank, medal }) => {
    const slotEl = podiumSlots[slot];
    const item = items[rank - 1];
    if (!item || !slotEl) return;
    const content = slotEl.querySelector('.podium-content');

    if (!animate) { fillSlot(slotEl, item, rank, medal); return; }

    content.classList.add('fading');
    setTimeout(() => {
      fillSlot(slotEl, item, rank, medal);
      content.classList.remove('fading');
    }, 260);
  });
}

const btnHuman = document.getElementById('btnHuman');
const btnDog = document.getElementById('btnDog');
const toggleTrack = document.getElementById('toggleTrack');

function setPodiumFlavor(flavor) {
  const isDog = flavor === 'dog';
  document.getElementById('heroPodiumSection').classList.toggle('is-dog', isDog);
  toggleTrack.classList.toggle('is-dog', isDog);
  btnHuman.classList.toggle('active', !isDog);
  btnDog.classList.toggle('active', isDog);
  btnHuman.setAttribute('aria-pressed', String(!isDog));
  btnDog.setAttribute('aria-pressed', String(isDog));
  paintPodium(flavor, true);
}
btnHuman.addEventListener('click', () => setPodiumFlavor('human'));
btnDog.addEventListener('click', () => setPodiumFlavor('dog'));

paintPodium('human', false);