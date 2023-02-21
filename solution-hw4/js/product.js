/*
 * Manages the price on the product page.
 */

const glazingOptions = [
  { name: 'Keep original',    extraCharge: 0.00 },
  { name: 'Sugar milk',       extraCharge: 0.00 },
  { name: 'Vanilla milk',     extraCharge: 0.50 },
  { name: 'Double chocolate', extraCharge: 1.50 },
];

const packSizes = [
  { name:  1, priceMultiplier:  1 },
  { name:  3, priceMultiplier:  3 },
  { name:  6, priceMultiplier:  5 },
  { name: 12, priceMultiplier: 10 },
];

class Roll {
   constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}

// Order controls
const glazingSelect = document.querySelector('.glazing-select');
const sizeSelect = document.querySelector('.size-select');
const priceDisplay = document.querySelector('.product-detail-price');

// Load the roll from the URL parameters
const cart = [];
let basePrice;

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
if (rolls.hasOwnProperty(rollType)) {
  const roll = rolls[rollType];

  basePrice = roll.basePrice;

  document.title = `${rollType} cinnamon roll — Bun Bun Bake Shop`;
  document.querySelector('.product-name').innerText = `${rollType} cinnamon roll`;
  document.querySelector('.product-detail-image').setAttribute('src', `products/${roll.imageFile}`);

  populate(glazingSelect, glazingOptions);
  populate(sizeSelect, packSizes);

  // Show the initial price
  updatePrice();

  // Handle the order form submission
  document.querySelector('.product-detail-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addToCart();
  });
} else {
  document.querySelector('body > main').innerText = 'Product not found.';
}

/**
 * Updates the displayed product price.
 */
function updatePrice() {
  const selectedGlazingIndex = glazingSelect.selectedIndex;
  const selectedPackSize = sizeSelect.selectedIndex;

  const selectedGlazing = glazingOptions[selectedGlazingIndex];
  const selectedSize = packSizes[selectedPackSize];
  const price = (basePrice + selectedGlazing.extraCharge) * selectedSize.priceMultiplier;
  const roundedPrice = Math.round(price * 100) / 100;
  priceDisplay.innerText = `$ ${roundedPrice}`;
}

/**
 * Populates a HTML select element with some options, and adds the event
 * listener on it.
 * @param {HTMLSelectElement} select A HTML select element
 * @param {Array} options An array of options, each having their name to display
 *                        in a “name” property.
 */
function populate(select, options) {
  select.innerHTML = ''; // Clear the list
  options.forEach(({ name }) => {
    const option = document.createElement('option');
    option.innerText = name;
    select.appendChild(option);
  });

  select.addEventListener('change', () => updatePrice());
}

function addToCart() {
  const selectedGlazing = glazingOptions[glazingSelect.selectedIndex];
  const selectedSize = packSizes[sizeSelect.selectedIndex];

  cart.push(new Roll(rollType, selectedGlazing, selectedSize, basePrice));
  console.log(cart);
}
