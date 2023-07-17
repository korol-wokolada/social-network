import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStatus,
  getUserProfileApi,
  savePhotoFile,
  updateStatus,
} from "../../API/ProfileApi";

import { updateUserStatus } from "./Profile-slice";

export const getProfileInformationThunk = createAsyncThunk(
  "profile/getProfileInformationThunk",
  async (userId: number) => {
    let data = await getUserProfileApi(userId);
    return data;
  }
);

export const saveProfilePhotoThunk = createAsyncThunk(
  "profile/saveProfilePhoto",
  async (file: File) => {
    let response = await savePhotoFile(file);
    if (response.data.resultCode === 0) {
      return response.data.data;
    }
  }
);

export const getProfileStatusThunk = createAsyncThunk(
  "profile/getProfileStatusThunk",
  async (userId: number, { dispatch }) => {
    try {
      let data = await getStatus(userId).then((res) => res.data);
      dispatch(updateUserStatus(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProfileStatusThunk = createAsyncThunk(
  "profile/updateProfileStatusThunk",
  async (status: string) => {
    try {
      await updateStatus(status);
    } catch (error) {
      console.log(error);
    }
  }
);
