import { createAsyncThunk } from "@reduxjs/toolkit";
import { followUserApi, getUsers, unFollowUserApi } from "../../api/userApi";

import { getUsersType } from "./types";

export const getUsersThunk = createAsyncThunk(
  "users/getUsersThunk",
  async ({ currentPage, pageSize }: getUsersType) => {
    try {
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
      await followUserApi(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const unfollowUserThunk = createAsyncThunk(
  "users/unfollowUserThunk",
  async (id: number) => {
    try {
      await unFollowUserApi(id);
    } catch (error) {
      console.log(error);
    }
  }
);
