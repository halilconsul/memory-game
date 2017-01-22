import { createSelector } from 'reselect';

const itemsSelector = store => store.items.items;

function totalCardsFlipped(allItems) {
   let counter = 0;
   allItems.map(item => {
      if (item.isFlipped) counter++;
   });
   return counter;
   console.log(counter);
}

export default createSelector(
   itemsSelector,
   totalCardsFlipped
);
