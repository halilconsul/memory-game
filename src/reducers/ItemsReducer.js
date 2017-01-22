import AppConstants from '../constants/AppConstants.js';
import { generateTable } from '../utils/index.js';
import shuffle from 'lodash.shuffle';
const initialState = {
   items: [],
   selectedItemsId: [],
   isMatched: true,
   numberOfMoves: 0
}

const colors = ['#FFDAB9', '#9ACD32', '#20B2AA', '#FA8072', '#00CED1', '#87CEFA', '#BA55D3', '#FF69B4', '#FF6347', '#FF8C00', '#D2691E', '#DEB887'];

export default function(state=initialState, action) {
   switch (action.type) {
      case AppConstants.LOAD_ITEMS_FULFILLED: {
         return {
            ...state,
            items: generateTable(action.payload, colors)
         }
      }
         break;

      case AppConstants.FLIP_ITEM_FULFILLED: {
         const itemId = action.payload;
         const allItems = [...state.items];
         const updatedItem = allItems.findIndex(item => item.id === itemId);
         allItems[updatedItem].isFlipped = !allItems[updatedItem].isFlipped;
         return {
            ...state,
            items: allItems,
            selectedItemsId: [...state.selectedItemsId, itemId],
            numberOfMoves: state.numberOfMoves + 1
         }
      }
         break;

       case AppConstants.COMPARE_ITEMS_FULFILLED: {
          const itemOne = action.payload[0];
          const itemTwo = action.payload[1];
          const allItems = [...state.items];
          if (itemOne.color !== itemTwo.color) {
             action.payload.map(card => {
                const updatedItemIndex = allItems.findIndex(item => item.id === card.id);
                allItems[updatedItemIndex].isValid = false;
             });
             return {
               ...state,
               items: allItems,
               selectedItemsId: [],
               isMatched: false
            }
         } else {
            return {
               ...state,
               selectedItemsId: [],
            }
         }
       }
          break;

      case AppConstants.TURN_ITEMS_BACK_FULFILLED: {
         const allItems = [...state.items];
         const filteredItems = allItems.filter(item => item.isValid === false);
         filteredItems.map(item => {
            item.isValid = true;
            item.isFlipped = false;
            const updatedItemIndex = allItems.findIndex(card => card.id === item.id);
            allItems[updatedItemIndex] = item;
         });
         return {
            ...state,
            items: allItems,
            isMatched: true
         }
      }
         break;

      case AppConstants.RESET_BOARD_FULFILLED: {
         const allItems = [...state.items];
         allItems.map(item => item.isFlipped = false);
         return {
            ...state,
            items: shuffle(allItems),
            numberOfMoves: 0
         }
      }
         break;
   }
   return state;
}
