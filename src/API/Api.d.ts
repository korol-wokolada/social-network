export type PutDeleteResponseType = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: {};
};
export type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string | null;
};
type responseDataType = { id: number; email: string; login: string };
type responseSetPhotoType = {
  photos: PhotosType;
};

export type ResponseType<D = {}> = {
  data: D;
  resultCode: ResultCode;
  messages: Array<string>;
};
export enum ResultCode {
  success = 0,
  error = 1,
  captchaUrlIsRequired = 10,
}

export type ChatMessagesType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
