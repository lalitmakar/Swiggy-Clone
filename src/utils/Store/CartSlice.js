import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      let objectChanged = false;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload.id) {
          const incrementCount = state.items[i].cartCount + 1;
          state.items[i].cartCount = incrementCount;
          objectChanged = true;
          break; //break out after changing object
        }
      }
      if (!objectChanged) state.items.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === action.payload.id) {
          if (state.items[i].cartCount > 1) {
            const decrementCount = state.items[i].cartCount - 1;
            state.items[i].cartCount = decrementCount;
          } else {
            state.items.splice(i, 1);
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  CartSlice.actions;

export default CartSlice.reducer;
