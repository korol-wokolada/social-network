import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { followUserThunk, getUsersThunk, unfollowUserThunk } from "./userThunk";
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
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        state.totalUsersCount = action.payload?.totalCount;
        state.users = action.payload?.items;
        console.log(state.users);
      })
      .addCase(followUserThunk.fulfilled, (state, action) => {
        state.followingProgress.push(action.meta.arg);
      })

      .addCase(unfollowUserThunk.fulfilled, (state, action) => {
        state.followingProgress.push(action.meta.arg);
      });
  },
});

export default userSlice.reducer;
export const { setCurrentPage } = userSlice.actions;
