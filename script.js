const toggleButtons = [
  document.getElementById('monthlybtn'),
  document.getElementById('yearlybtn')
];

const filterButtons = [
  document.getElementById('allbtn'),
  document.getElementById('basicbtn'),
  document.getElementById('premiumbtn')
];

let currentPlanType = 'monthly';
let currentFilter = 'all';

function setActiveButton(buttons, activeButton) {
  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function updatePrices() {
  const prices = document.querySelectorAll('.price');

  prices.forEach((price) => {
    const selectedValue =
      currentPlanType === 'monthly'
        ? price.dataset.monthly
        : price.dataset.yearly;

    price.textContent = `$${selectedValue}`;
  });
}

function updateFilter() {
  const cards = document.querySelectorAll('.card-basic, .card-premium');

  cards.forEach((card) => {
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'basic' && card.classList.contains('card-basic')) ||
      (currentFilter === 'premium' && card.classList.contains('card-premium'));

    card.style.display = matchesFilter ? 'block' : 'none';
  });
}

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentPlanType = button.id === 'monthlybtn' ? 'monthly' : 'yearly';
    setActiveButton(toggleButtons, button);
    updatePrices();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.id.replace('btn', '').replace('all', 'all');

    if (button.id === 'allbtn') {
      currentFilter = 'all';
    } else if (button.id === 'basicbtn') {
      currentFilter = 'basic';
    } else if (button.id === 'premiumbtn') {
      currentFilter = 'premium';
    }

    setActiveButton(filterButtons, button);
    updateFilter();
  });
});

setActiveButton(toggleButtons, toggleButtons[0]);
setActiveButton(filterButtons, filterButtons[0]);
updatePrices();
updateFilter();
