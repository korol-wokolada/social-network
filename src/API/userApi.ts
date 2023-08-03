import { GetUsersType, PutDeleteResponseType } from "./types";
import { instance } from "./apiSettings";
import { getUsersType } from "../store/usersSlise/types";

export async function getUsers({ currentPage, pageSize }: getUsersType) {
  const response = await instance.get<GetUsersType>(
    `users?page=${currentPage}&count=${pageSize}`
  );
  return response.data;
}

export async function followUserApi(id: number) {
  try {
    return await instance
      .post<PutDeleteResponseType<any>>(`follow/${id}`)
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
  }
}

export async function unFollowUserApi(id: number) {
  try {
    const res = await instance.delete<PutDeleteResponseType<any>>(
      `follow/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
