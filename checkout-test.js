const checkout = require("./checkout.js");

const item1 = { id: 1, price: 9.25 };
const item2 = { id: 2, price: 45.0 };
const item3 = { id: 3, price: 19.95 };

// if you spend over $60 then you get 10% of your purchase
const percentageDiscount = { threshold: 60, percent: 10 };

// if you buy 2 or more id-1 items then the price drops to $8.50
const priceOverride = { itemId: 1, threshold: 2, price: 8.5 };

const co = checkout({ percentageDiscount, priceOverride });

describe("checkout(promotional_rules)(items)", () => {
  it("applies the discount", () => {
    expect(co([item1, item2, item3])).toBe(66.78);
  });

  it("overrides the price", () => {
    expect(co([item1, item3, item1])).toBe(36.95);
  });

  it("overrides the price and applies the discount", () => {
    expect(co([item1, item2, item1, item3])).toBe(73.76);
  });
});
