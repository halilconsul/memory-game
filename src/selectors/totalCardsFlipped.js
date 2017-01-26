import { createSelector } from 'reselect';

const itemsSelector = store => store.board.items;

function totalCardsFlipped(allItems) {
   let counter = 0;
   allItems.map(item => {
      if (item.isFlipped) counter++;
   });
   return counter;
}

export default createSelector(
   itemsSelector,
   totalCardsFlipped
);
