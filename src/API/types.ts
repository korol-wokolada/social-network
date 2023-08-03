import { ChatMessagesType } from "../store/messagesSlice/types";
import { PhotosType } from "../store/profileSlice/types";
import { UsersType } from "../store/usersSlise/types";
import { BackendResultCode } from "./constants";
// настроить респонсы с помощью дженерика
export type PutDeleteResponseType<T> = {
  resultCode: BackendResultCode;
  messages: Array<string>;
  data: T;
};

export type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string | null;
};

export type ResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export type ResponseSetPhotoType = {
  photos: PhotosType;
};

export type ResponseType<D = {}> = {
  data: D;
  resultCode: BackendResultCode;
  messages: Array<string>;
};

export type SubscriberType = (messages: ChatMessagesType[]) => void;
