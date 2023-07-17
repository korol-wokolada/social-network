import { getUsersType } from "../Redux-Toolkit/Users-Reducer/Users-thunk";
import { GetUsersType, PutDeleteResponseType } from "./Api";
import { instance } from "./ApiSettings";

export async function getUsers({ currentPage, pageSize }: getUsersType) {
  const response = await instance.get<GetUsersType>(
    `users?page=${currentPage}&count=${pageSize}`
  );
  return response.data;
}

export async function followUserApi(id: number) {
  try {
    return await instance
      .post<PutDeleteResponseType>(`follow/${id}`)
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}

export async function unFollowUserApi(id: number) {
  try {
    const res = await instance.delete<PutDeleteResponseType>(`follow/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
