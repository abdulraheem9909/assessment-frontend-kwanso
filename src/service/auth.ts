import { useFetch } from "../routes/useFetch";

export interface IAuth {
  password: string;
  email: string;
}

export const loginApi = async (data: IAuth) => {
  return await useFetch.post(`user/login`, data);
};
export const signUpApi = async (data: IAuth) => {
  return await useFetch.post(`user/register`, data);
};
export const getUser = async () => {
  return await useFetch.get(`user`);
};
