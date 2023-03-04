/*
 * Manages the items on the cart page
 */

function getGlazing(name) {
  const res = glazingOptions.find(option => option.name === name);
  if (res === undefined) throw new Error(`Value ${name} not found`);
  return res;
}

function getPackSize(quantity) {
  const res = packSizes.find(option => option.name === quantity);
  if (res === undefined) throw new Error(`Value ${quantity} not found`);
  return res;
}

let cart = [
  new Roll('Original', 'Sugar milk', 1),
  new Roll('Walnut', 'Vanilla milk', 12),
  new Roll('Raisin', 'Sugar milk', 3),
  new Roll('Apple', 'Keep original', 3),
];

function appendItem(item, itemIndex) {
  const thumbnailImg = document.createElement('img');
  thumbnailImg.setAttribute('src', item.imageUrl);

  const removeButton = document.createElement('button');
  removeButton.classList.add('button-tertiary');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', () => {
    cart = cart.filter(elem => elem !== item);
    updateCart();
  });

  const title = document.createElement('h2');
  title.innerText = item.title;

  const glazingDetail = document.createElement('div');
  glazingDetail.innerText = `Glazing: ${item.glazing.name}`;
  glazingDetail.classList.add('cart-detail');

  const sizeDetail = document.createElement('div');
  sizeDetail.innerText = `Pack Size: ${item.size.name}`;
  sizeDetail.classList.add('cart-detail');

  const price = document.createElement('div');
  price.classList.add('cart-item-price');
  price.innerText = `$ ${item.totalPrice.toFixed(2)}`;

  const thumbnail = document.createElement('div');
  thumbnail.classList.add('cart-item-thumbnail');
  thumbnail.replaceChildren(thumbnailImg, removeButton);

  const contents = document.createElement('div');
  contents.classList.add('cart-item-contents');
  contents.replaceChildren(title, glazingDetail, sizeDetail);

  const el = document.createElement('article');
  el.classList.add('cart-item');
  el.replaceChildren(thumbnail, contents, price);
  
  document.querySelector('.cart-contents').appendChild(el);
}

/**
 * Updates the items displayed on the card
 */
function updateCart() {
  document.querySelector('.cart-contents').replaceChildren();
  cart.forEach(appendItem);

  const totalPrice = cart.map(item => item.totalPrice).reduce((a, b) => a + b, 0);
  document.querySelector('.cart-total-value').innerText = `$ ${totalPrice.toFixed(2)}`;
}

updateCart();

// Order controls
const glazingSelect = document.querySelector('.glazing-select');
const sizeSelect = document.querySelector('.size-select');
const priceDisplay = document.querySelector('.product-detail-price');
