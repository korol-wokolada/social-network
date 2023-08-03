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
      .addCase(getProfileInformationThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(
        getProfileInformationThunk.fulfilled,
        (state, action: PayloadAction<ProfileType>) => {
          state.isProfileLoading = false;
          state.profile = action.payload;
        }
      )
      .addCase(saveProfilePhotoThunk.pending, (state) => {
        state.isPhotoLoading = true;
      })
      .addCase(
        saveProfilePhotoThunk.fulfilled,
        (state, action: PayloadAction<PhotosType>) => {
          if (state.profile === null) {
            state.isPhotoLoading = false;
            return;
          }
          state.profile.photos = action.payload;
          state.isPhotoLoading = false;
        }
      );
  },
});
export default profileSlice.reducer;
export const { updateUserStatus } = profileSlice.actions;
