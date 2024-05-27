export const categorizeCards = (cards) => {
  const adCards = {};
  const itemCards = {};
  const categories = {
    Electronics: [],
    Appliance: [],
    Furniture: [],
    Clothing: [],
    Grocery: []
  };

  for (const key in cards) {
    if (cards.hasOwnProperty(key)) {
      const card = cards[key];
      if (card.cardType === 'Ad') {
        adCards[key] = card;
      } else if (card.cardType === 'item') {
        // console.log(card._id);
        itemCards[card._id] = card;
        const category = card.category;
        if (categories.hasOwnProperty(category)) {
          categories[category].push(card);
        }
      }
    }
  }

  return { adCards, itemCards, categories };
};
