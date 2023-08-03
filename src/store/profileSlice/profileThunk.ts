import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateUserStatus } from "./profileSlice";
import {
  getStatusRequest,
  getUserProfileRequest,
  savePhotoFileRequest,
  updateStatusRequest,
} from "../../api/profileApi";

export const getProfileInformationThunk = createAsyncThunk(
  "profile/getProfileInformationThunk",
  async (userId: number) => {
    let data = await getUserProfileRequest(userId);
    return data;
  }
);

export const saveProfilePhotoThunk = createAsyncThunk(
  "profile/saveProfilePhoto",
  async (file: File) => {
    let response = await savePhotoFileRequest(file);
    if (response.data.resultCode === 0) {
      return response.data.data;
    }
  }
);

export const getProfileStatusThunk = createAsyncThunk(
  "profile/getProfileStatusThunk",
  async (userId: number, { dispatch }) => {
    try {
      let data = await getStatusRequest(userId).then((res) => res.data);
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
      await updateStatusRequest(status);
    } catch (error) {
      console.log(error);
    }
  }
);
