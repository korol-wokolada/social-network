import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UsersType } from "./User-Reducer";
import {
  followUserThunk,
  getUsersThunk,
  unfollowUserThunk,
} from "./Users-thunk";

let initialState = {
  users: [] as Array<UsersType> | undefined,
  totalUsersCount: 500 as number | undefined,
  pageSize: 7,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as Array<number>, // array of users ids
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>): void => {
      state.currentPage = action.payload;
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
      .addCase(followUserThunk.pending, (state, action) => {
        state.followingProgress.push(action.meta.arg);
      })
      .addCase(followUserThunk.fulfilled, (state, action) => {
        state.users?.map((user) => {
          if (user.id === action.meta.arg) {
            return { ...user, followed: true };
          }
          return user;
        });
        state.followingProgress.shift();
        console.log(action.meta.arg);
      })

      .addCase(unfollowUserThunk.pending, (state, action) => {
        state.followingProgress.push(action.meta.arg);
      })
      .addCase(unfollowUserThunk.fulfilled, (state, action) => {
        state.users?.map((user) => {
          if (user.id === action.meta.arg) {
            return { ...user, followed: false };
          }
          return user;
        });
        state.followingProgress.shift();
      });
  },
});

export default userSlice.reducer;
export const { setCurrentPage } = userSlice.actions;
