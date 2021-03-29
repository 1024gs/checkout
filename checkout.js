const percent = (b) => (a) => (a / 100) * b;

const round = (n) => Math.round(n * 100) / 100;

const checkout = ({ percentageDiscount, priceOverride }) => (items) => {
  const price = (item) => {
    if (priceOverride.itemId !== item.id) {
      return item.price;
    }

    if (
      items.filter((x) => x.id === priceOverride.itemId).length <
      priceOverride.threshold
    ) {
      return item.price;
    }

    return priceOverride.price;
  };

  const total = items.map(price).reduce((a, b) => a + b, 0);

  const discount = percent(percentageDiscount.percent);

  return round(
    total > percentageDiscount.threshold ? total - discount(total) : total
  );
};

module.exports = checkout;
