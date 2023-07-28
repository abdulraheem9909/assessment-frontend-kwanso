import { useFetch } from "../routes/useFetch";

export const getTasks = async () => {
  return await useFetch.get(`tasks`);
};

export const createTask = async (data: any) => {
  return await useFetch.post(`tasks`, data);
};

export const deleteTask = async (id: string) => {
  return await useFetch.delete(`tasks/${id}`);
};
export const deleteAllTask = async () => {
  return await useFetch.delete(`tasks/all`);
};
