import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhotosType, ProfileType } from "./types";
import {
  getProfileInformationThunk,
  saveProfilePhotoThunk,
} from "./profileThunk";
import { initialState } from "./constants";

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUserStatus: (state, action: PayloadAction<string | undefined>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInformationThunk.pending, (state) => {})
      .addCase(
        getProfileInformationThunk.fulfilled,
        (state, action: PayloadAction<ProfileType>) => {
          state.profile = action.payload;
        }
      )
      .addCase(saveProfilePhotoThunk.pending, (state) => {})
      .addCase(
        saveProfilePhotoThunk.fulfilled,
        (state, action: PayloadAction<PhotosType>) => {
          if (state.profile === null) {
            return;
          }
          state.profile.photos = action.payload;
        }
      );
  },
});
export default profileSlice.reducer;
export const { updateUserStatus } = profileSlice.actions;
