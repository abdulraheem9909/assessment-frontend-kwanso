import axios from "axios";
import { useEffect } from "react";
import useLogout from "../utils/useLogout";
const useFetch = axios.create({
  baseURL: "http://localhost:4000",
});

useFetch.interceptors.request.use(
  async (config: any) => {
    config.headers = config.headers;
    if (localStorage.getItem("access_token")) {
      const accessToken: any = localStorage.getItem("access_token");
      const token = JSON.parse(accessToken);
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

const AxiosInterceptor = ({ children }: any) => {
    const { logoutHandler } = useLogout();

  useEffect(() => {
    const interceptor = useFetch.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        if (error?.response?.status === 401) {
          logoutHandler();
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );

    return () => useFetch.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export { useFetch, AxiosInterceptor };
