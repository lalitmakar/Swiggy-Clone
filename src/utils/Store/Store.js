import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
import OnlineSlice from "./OnlineSlice.js";

const Store = configureStore({
  reducer: {
    Cart: CartSlice,
    Online: OnlineSlice,
  },
});

export default Store;
