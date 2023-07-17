import { createAsyncThunk } from "@reduxjs/toolkit";
import { followUserApi, getUsers, unFollowUserApi } from "../../API/UsersApi";
import { setCurrentPage } from "./Users-slice";

export type getUsersType = {
  currentPage: number;
  pageSize?: number;
};

export const getUsersThunk = createAsyncThunk(
  "users/getUsersThunk",
  async ({ currentPage, pageSize }: getUsersType, { dispatch }) => {
    try {
      dispatch(setCurrentPage(currentPage));
      let data = await getUsers({ currentPage, pageSize });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const followUserThunk = createAsyncThunk(
  "users/followUserThunk",
  async (id: number) => {
    try {
      let data = await followUserApi(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const unfollowUserThunk = createAsyncThunk(
  "users/unfollowUserThunk",
  async (id: number) => {
    try {
      let data = await unFollowUserApi(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
