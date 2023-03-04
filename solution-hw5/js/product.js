/*
 * Manages the price on the product page.
 */

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

  document.title = `${rollType} Cinnamon Roll — Bun Bun Bake Shop`;
  document.querySelector('.product-name').innerText = `${rollType} Cinnamon Roll`;
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
  const selectedGlazing = glazingOptions[glazingSelect.selectedIndex];
  const selectedSize = packSizes[sizeSelect.selectedIndex];
  const roll = new Roll(rollType, selectedGlazing.name, selectedSize.name, basePrice);
  priceDisplay.innerText = `$ ${roll.totalPrice.toFixed(2)}`;
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

  cart.push(new Roll(rollType, selectedGlazing.name, selectedSize.name, basePrice));
  console.log(cart);
}
