import AppConstants from '../constants/AppConstants.js';

const ItemsActions = {
   loadItems() {
      return {
         type: AppConstants.LOAD_ITEMS_FULFILLED,
         payload: 16
      }
   },

   flipItem(cardId) {
      return {
         type: AppConstants.FLIP_ITEM_FULFILLED,
         payload: cardId
      }
   },

   compareSelectedItems(selectedItems) {
      return {
         type: AppConstants.COMPARE_ITEMS_FULFILLED,
         payload: selectedItems
      }
   },

   turnItemsBack() {
      return {
         type: AppConstants.TURN_ITEMS_BACK_FULFILLED
      }
   },

   resetBoard() {
      return {
         type: AppConstants.RESET_BOARD_FULFILLED
      }
   }
}

export default ItemsActions;
