import { createSelector } from 'reselect';

const itemsSelector = store => store.board.items;
const selectedItemsId = store => store.board.selectedItemsId;

function getSelectedItems(allItems, selectedItemsId) {
   const selectedItems = [];
   for (let i = 0; i < selectedItemsId.length; i++) {
      const selectedItemIndex = allItems.findIndex(item => item.id === selectedItemsId[i]);
      selectedItems.push(allItems[selectedItemIndex]);
   }
   return selectedItems;
}

export default createSelector(
   itemsSelector,
   selectedItemsId,
   getSelectedItems
);
