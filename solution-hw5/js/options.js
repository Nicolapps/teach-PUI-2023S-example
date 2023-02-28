const glazingOptions = [
  { name: 'Keep original', extraCharge: 0.00 },
  { name: 'Sugar milk', extraCharge: 0.00 },
  { name: 'Vanilla milk', extraCharge: 0.50 },
  { name: 'Double chocolate', extraCharge: 1.50 },
];

const packSizes = [
  { name: 1, priceMultiplier: 1 },
  { name: 3, priceMultiplier: 3 },
  { name: 6, priceMultiplier: 5 },
  { name: 12, priceMultiplier: 10 },
];

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice ?? rolls[rollType].basePrice;
  }

  get totalPrice() {
    return (this.basePrice + this.glazing.extraCharge) * this.size.priceMultiplier;
  }

  get imageUrl() {
    return `products/${rolls[this.type].imageFile}`;
  }

  get title() {
    return `${this.type} Cinnamon Roll`;
  }
}
