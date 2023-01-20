import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";

const cartData = getCartFromLS();

const initialState = {
  // totalPrice: 0,
  // items: []
  totalPrice: cartData.totalPrice,
  items: cartData.items,
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return Math.ceil((obj.price + sum) * 100) / 100;
    //   }, 0);
    // },
    addItem(state, action) {
      const findItem = state.items.find((obj: any) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum: any, obj: any) => {
        return Math.ceil(((obj.price * obj.count) + sum) * 100) / 100;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj: any) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj: any) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const { addItem, removeItem, minusItem, clearItems } = basketSlice.actions;

export default basketSlice.reducer;