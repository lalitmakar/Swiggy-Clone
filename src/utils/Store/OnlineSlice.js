import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const OnlineSlice = createSlice({
  name: "Online",
  initialState: {
    isOnline: true,
  },
  reducers: {
    setOnline: (state, action) => {
      state.isOnline = true;
    },
    setOffline: (state, action) => {
      state.isOnline = false;
    },
  },
});

export const { setOnline, setOffline } = OnlineSlice.actions;
export default OnlineSlice.reducer;
