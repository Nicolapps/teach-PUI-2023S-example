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

const BASE_PRICE = 2.49;

const glazingSelect = document.querySelector('.glazing-select');
const sizeSelect = document.querySelector('.size-select');
const priceDisplay = document.querySelector('.product-detail-price');

/**
 * Updates the displayed product price.
 */
function updatePrice() {
  let selectedGlazingIndex = glazingSelect.selectedIndex;
  let selectedPackSize = sizeSelect.selectedIndex;

  const selectedGlazing = glazingOptions[selectedGlazingIndex];
  const selectedSize = packSizes[selectedPackSize];
  const price = (BASE_PRICE + selectedGlazing.extraCharge) * selectedSize.priceMultiplier;
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

// Populate the form
populate(glazingSelect, glazingOptions);
populate(sizeSelect, packSizes);

// Show the initial price
updatePrice();
