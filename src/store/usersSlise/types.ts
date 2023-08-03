import { PhotosType } from "../profileSlice/types";

export interface UsersType {
  id: number;
  name: string;
  followed: boolean;
  status: string;
  photos: PhotosType;
}

export type getUsersType = {
  currentPage: number;
  pageSize?: number;
};
