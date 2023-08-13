import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>): void => {
      state.currentPage = action.payload;
      state.followingProgress = [];
    },
  },
});

export default userSlice.reducer;
export const { setCurrentPage } = userSlice.actions;
