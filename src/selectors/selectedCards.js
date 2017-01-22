import { createSelector } from 'reselect';

const itemsSelector = store => store.items.items;
const selectedItemsId = store => store.items.selectedItemsId;

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
