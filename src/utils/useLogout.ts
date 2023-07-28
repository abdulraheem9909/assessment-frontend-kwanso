import { removeToken } from "./helper";

const useLogout = () => {
  const logoutHandler = () => {
    removeToken();
  };

  return { logoutHandler };
};

export default useLogout;
