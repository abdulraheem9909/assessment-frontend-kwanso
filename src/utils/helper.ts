export const getToken = () => {
  return localStorage.getItem("access_token");
};
export const setToken = (data: string) => {
  return localStorage.setItem("access_token", JSON.stringify(data));
};
export const removeToken = () => {
  return localStorage.removeItem("access_token");
};

